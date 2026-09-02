import { useEffect, useRef } from "react";

interface LetterGlitchProps {
  colors?: string[];
  speed?: number;
  showOuterVignette?: boolean;
}

// Vignette colour — must match the section background (#0a0e14)
const VIGNETTE_RGB = "10, 14, 20";

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

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationId: number | null = null;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let lastFrame = 0;

    // Throttle the redraw to ~20fps — the flicker reads the same, at a third of the cost.
    const frameInterval = 1000 / 20;

    // Grid settings
    const fontSize = 16;
    const font = `${fontSize}px monospace`;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

    let columns = 0;
    let rows = 0;
    let grid: { char: string; color: string }[] = [];

    // Vignette is a full-screen radial gradient — build it once, not every frame.
    let vignette: CanvasGradient | null = null;

    const initGrid = (w: number, h: number) => {
      width = w;
      height = h;
      canvas.width = width;
      canvas.height = height;

      columns = Math.ceil(width / fontSize);
      rows = Math.ceil(height / fontSize);

      grid = new Array(columns * rows).fill(null).map(() => ({
        char: chars[Math.floor(Math.random() * chars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      if (showOuterVignette) {
        vignette = ctx.createRadialGradient(
          width / 2,
          height / 2,
          0,
          width / 2,
          height / 2,
          Math.max(width, height) / 1.5,
        );
        vignette.addColorStop(0, `rgba(${VIGNETTE_RGB}, 0)`);
        vignette.addColorStop(1, `rgba(${VIGNETTE_RGB}, 1)`);
      }

      render(true);
    };

    const render = (full: boolean) => {
      if (!ctx || width === 0 || height === 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textBaseline = "top";

      if (!full) {
        const updateCount = Math.floor(columns * rows * (speed / 1000));
        for (let i = 0; i < updateCount; i++) {
          const idx = Math.floor(Math.random() * grid.length);
          if (grid[idx]) {
            grid[idx].char = chars[Math.floor(Math.random() * chars.length)];
            grid[idx].color = colors[Math.floor(Math.random() * colors.length)];
          }
        }
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const cell = grid[y * columns + x];
          if (!cell) continue;
          ctx.fillStyle = cell.color;
          ctx.globalAlpha = Math.random() < 0.1 ? 0.3 : 1;
          ctx.fillText(cell.char, x * fontSize, y * fontSize);
        }
      }
      ctx.globalAlpha = 1;

      if (showOuterVignette && vignette) {
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const loop = (now: number) => {
      animationId = requestAnimationFrame(loop);
      if (!isVisible || document.hidden) return;
      if (now - lastFrame < frameInterval) return;
      lastFrame = now;
      render(false);
    };

    const start = () => {
      if (reduceMotion || animationId !== null) return;
      animationId = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
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

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibility = () => {
      if (!document.hidden && isVisible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!reduceMotion) start();

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, [colors, speed, showOuterVignette]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-transparent"
      style={{ zIndex: 0 }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
