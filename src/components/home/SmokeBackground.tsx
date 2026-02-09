import { Canvas, useFrame } from "@react-three/fiber";
import { Cloud, Clouds } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";

function MovingClouds() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={1}
          scale={2}
          volume={5}
          color="#064e3b" // emerald-900
          fade={100}
          speed={0.1}
          position={[-4, -2, -5]}
          opacity={0.4}
        />
        <Cloud
          seed={2}
          scale={3}
          volume={5}
          color="#134e4a" // teal-900
          fade={100}
          speed={0.1}
          position={[4, 2, -10]}
          opacity={0.3}
        />
        <Cloud
          seed={3}
          scale={2}
          volume={4}
          color="#065f46" // emerald-800
          fade={100}
          speed={0.15}
          position={[0, 0, -8]}
          opacity={0.3}
        />
      </Clouds>
    </group>
  );
}

export default function SmokeBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Artificial delay to ensure textures/shaders are fully prepped visually
    // or just waiting for mount.
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none transition-opacity duration-2000 ease-in-out ${ready ? "opacity-100" : "opacity-0"
        }`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true }}
        onCreated={() => setReady(true)}
      >
        <MovingClouds />
      </Canvas>
    </div>
  );
}
