import { useEffect, useRef } from "react";

interface LetterGlitchProps {
  colors?: string[];
  speed?: number;
  showOuterVignette?: boolean;
}

export const LetterGlitch = ({
  colors = ["#eb9ec6", "#343ac5", "#bf6cae"],
  speed = 100,
  showOuterVignette = true,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Grid settings
    const fontSize = 16;
    const font = `${fontSize}px monospace`;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    let columns = 0;
    let rows = 0;
    let grid: { char: string; color: string }[] = [];

    const initGrid = (w: number, h: number) => {
      width = w;
      height = h;
      canvas.width = width;
      canvas.height = height;

      columns = Math.ceil(width / fontSize);
      rows = Math.ceil(height / fontSize);

      grid = new Array(columns * rows).fill(null).map(() => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
    };

    const draw = () => {
      // Always schedule next frame
      animationId = requestAnimationFrame(draw);

      if (!ctx || width === 0 || height === 0) return;

      // Clear background
      ctx.clearRect(0, 0, width, height);

      ctx.font = font;
      ctx.textBaseline = "top";

      // Update character subset
      const updateCount = Math.floor((columns * rows) * (speed / 1000));

      for (let i = 0; i < updateCount; i++) {
        const idx = Math.floor(Math.random() * grid.length);
        if (grid[idx]) {
          grid[idx].char = chars[Math.floor(Math.random() * chars.length)];
          grid[idx].color = colors[Math.floor(Math.random() * colors.length)];
        }
      }

      // Draw grid
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const idx = y * columns + x;
          const cell = grid[idx];
          if (!cell) continue;

          ctx.fillStyle = cell.color;
          // Random opacity flicker
          ctx.globalAlpha = Math.random() < 0.1 ? 0.3 : 1;
          ctx.fillText(cell.char, x * fontSize, y * fontSize);
        }
      }
      ctx.globalAlpha = 1;

      // Vignette
      if (showOuterVignette) {
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) / 1.5);
        gradient.addColorStop(0, "rgba(5, 5, 8, 0)");
        gradient.addColorStop(1, "rgba(5, 5, 8, 1)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          initGrid(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });

    resizeObserver.observe(container);

    // Initial draw loop start
    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [colors, speed, showOuterVignette]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent"
      style={{ zIndex: 0 }} // Ensure it's behind content but visible
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
