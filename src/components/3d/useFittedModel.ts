"use client";

import { useGLTF } from "@react-three/drei";
import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export function useFittedModel(url: string, size = 2.6) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => clone(scene) as THREE.Object3D, [scene]);
  useLayoutEffect(() => {
    model.position.set(0, 0, 0);
    model.scale.setScalar(1);
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const dims = box.getSize(new THREE.Vector3());
    const s = size / Math.max(dims.x, dims.y, dims.z || 1);
    const c = box.getCenter(new THREE.Vector3());
    model.scale.setScalar(s);
    model.position.copy(c.multiplyScalar(-s));
  }, [model, size]);
  return model;
}
