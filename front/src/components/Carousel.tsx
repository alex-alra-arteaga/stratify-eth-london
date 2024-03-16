// @ts-nocheck: THREE js is a mess when it comes to types
"use client";

import * as THREE from "three";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image } from "@react-three/drei";
import { easing } from "maath";
import "@/utils/Geometry";

export default function () {
  return (
    <div className="overflow-y-hidden w-full h-full">
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#a79", 8.5, 12]} />
        <Rig rotation={[0, 0.2, 0.15]}>
          <Carousel />
        </Rig>
      </Canvas>
    </div>
  );
}

function Rig(props: object) {
  const ref = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (!ref.current || !state.events.update) {
      return;
    }
    ref.current.rotation.y -= 0.0008 * Math.PI * 2;
    state.events.update();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${Math.floor(i % 10) + 1}_.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({ url, ...props }: {
  url: string;
  [key: string]: any;
}) {
  const ref = useRef<unknown | null>(null);
  const [hovered, hover] = useState(false);

  const pointerOver = (
    e: unknown,
  ) => ((e as React.MouseEvent<HTMLButtonElement>).stopPropagation(),
    hover(true));

  const pointerOut = () => hover(false);

  useFrame((_state, delta) => {
    if (!ref.current) {
      return;
    }
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta,
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

/*

- Bitcoin
- PAX Gold
- Treasury Bills
- USDC
- APPLE (Stocks logo)
- Tesla
- SP&500
- NASDAQ
- Fidelity LOGO
- Ethererum

*/
