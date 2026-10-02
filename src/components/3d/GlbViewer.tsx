"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useFittedModel } from "./useFittedModel";

function Model({ url }: { url: string }) {
  const m = useFittedModel(url, 2.4);
  return <primitive object={m} />;
}

export default function GlbViewer({ url, active = true }: { url: string; active?: boolean }) {
  return (
    <Canvas frameloop={active ? "always" : "never"} dpr={[1, 1.5]} camera={{ position: [0, 0.6, 4.2], fov: 35 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.6} />
      <pointLight position={[-3, 1, -2]} intensity={25} color="#2dd4bf" />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
    </Canvas>
  );
}
