"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import GlbRobot from "./GlbRobot";

export type Look = { x: number; y: number }; // normalized: x -1 (left) to 1 (right), y -1 (down) to 1 (up)
type LookRef = { current: Look };

const damp = THREE.MathUtils.damp;

function ProceduralRobot({ lookRef, focused }: { lookRef: LookRef; focused: boolean }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const eyeMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, dt) => {
    const { x, y } = lookRef.current;
    const t = state.clock.elapsedTime;
    if (head.current) {
      head.current.rotation.y = damp(head.current.rotation.y, x * 0.8, 5, dt);
      head.current.rotation.x = damp(head.current.rotation.x, -y * 0.45, 5, dt);
      head.current.rotation.z = damp(head.current.rotation.z, -x * 0.08, 4, dt);
    }
    if (eyes.current) {
      eyes.current.position.x = damp(eyes.current.position.x, x * 0.1, 8, dt);
      eyes.current.position.y = damp(eyes.current.position.y, y * 0.06, 8, dt);
      const blink = t % 4.2 > 4.05 ? 0.1 : 1;
      eyes.current.scale.y = damp(eyes.current.scale.y, blink, 30, dt);
    }
    if (eyeMat.current) {
      eyeMat.current.emissiveIntensity = damp(eyeMat.current.emissiveIntensity, focused ? 2.4 : 1.3, 6, dt);
    }
    if (root.current) root.current.position.y = Math.sin(t * 1.4) * 0.08;
  });

  return (
    <group ref={root} position={[0, 0.1, 0]}>
      <group ref={head}>
        {/* shell */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhysicalMaterial color="#0d8b99" emissive="#0d8b99" emissiveIntensity={0.25} metalness={0.3} roughness={0.25} clearcoat={1} clearcoatRoughness={0.15} />
        </mesh>
        {/* visor */}
        <mesh position={[0, 0, 0.72]} scale={[0.66, 0.66, 0.3]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#04121f" metalness={0.6} roughness={0.15} />
        </mesh>
        {/* eyes */}
        <group ref={eyes} position={[0, 0, 1.0]}>
          {[-0.2, 0.2].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <capsuleGeometry args={[0.09, 0.22, 8, 16]} />
              <meshStandardMaterial ref={x < 0 ? eyeMat : undefined} color="#fde047" emissive="#facc15" emissiveIntensity={1.3} />
            </mesh>
          ))}
        </group>
        {/* ear pods + antenna */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.97, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
            <meshStandardMaterial color="#082545" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        <group position={[-0.9, 0.5, 0]} rotation={[0, 0, 0.25]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />
            <meshStandardMaterial color="#9fb3c8" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2} />
          </mesh>
        </group>
      </group>
      {/* feet */}
      {[-0.42, 0.42].map((x) => (
        <mesh key={x} position={[x, -1.25, 0.2]}>
          <sphereGeometry args={[0.2, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#0d8b99" emissive="#2dd4bf" emissiveIntensity={0.4} metalness={0.4} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Platform() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ring.current) ring.current.rotation.z += dt * 0.4;
  });
  return (
    <group position={[0, -1.6, 0]}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.62, 0.12, 64]} />
        <meshStandardMaterial color="#082545" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.025, 16, 96]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={2.2} />
      </mesh>
      <mesh ref={ring} position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.012, 16, 96]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[1.3, 2.4, 48, 1, true]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.07} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Particles({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 10;
      a[i * 3 + 1] = (Math.random() - 0.5) * 6;
      a[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#2dd4bf" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function RobotCanvas({
  lookRef,
  focused,
  active,
  modelUrl,
  headNode,
}: {
  lookRef: LookRef;
  focused: boolean;
  active: boolean;
  modelUrl?: string;
  headNode?: string;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 6.5], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[-3, 2, 3]} intensity={1.4} color="#bfe9ff" />
      <pointLight position={[3, 3, 4]} intensity={40} color="#2dd4bf" />
      <pointLight position={[0, 2, -3]} intensity={30} color="#7dd3fc" />
      <Particles />
      <Platform />
      {modelUrl ? (
        <Suspense fallback={null}>
          <GlbRobot url={modelUrl} lookRef={lookRef} headNode={headNode} />
        </Suspense>
      ) : (
        <ProceduralRobot lookRef={lookRef} focused={focused} />
      )}
    </Canvas>
  );
}
