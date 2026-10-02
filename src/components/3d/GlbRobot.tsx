"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFittedModel } from "./useFittedModel";

type LookRef = { current: { x: number; y: number } };
const damp = THREE.MathUtils.damp;

// If the model looks the wrong way or moves inverted, flip these.
const YAW_SIGN = 1;
const PITCH_SIGN = 1;

export default function GlbRobot({ url, lookRef, headNode }: { url: string; lookRef: LookRef; headNode?: string }) {
  const model = useFittedModel(url, 2.6);
  const group = useRef<THREE.Group>(null);

  const { head, base } = useMemo(() => {
    const re = new RegExp(headNode || "head|neck|skull", "i");
    const hits: THREE.Object3D[] = [];
    model.traverse((o) => {
      if (re.test(o.name)) hits.push(o);
    });
    const h = hits[0] ?? model; // no head node found: rotate the whole model
    return { head: h, base: h.rotation.clone() };
  }, [model, headNode]);

  useFrame((state, dt) => {
    const { x, y } = lookRef.current;
    head.rotation.y = damp(head.rotation.y, base.y + YAW_SIGN * x * 0.8, 5, dt);
    head.rotation.x = damp(head.rotation.x, base.x - PITCH_SIGN * y * 0.45, 5, dt);
    if (group.current) group.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <primitive object={model} />
    </group>
  );
}
