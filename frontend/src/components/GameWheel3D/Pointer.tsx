import { group } from "console";
import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Mesh } from "three";

type PropTypes = {
  position: number;
};

const Pointer = ({ position }: PropTypes) => {
  const pointer = useRef<Mesh>();
  //   useFrame(() => {
  //     if (pointer.current) {
  //       pointer.current.rotation.x = pointer.current.rotation.y += 0.01;
  //     }
  //   });
  return (
    <mesh
      ref={pointer}
      position={[0, 2.2, 0.1]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[-Math.PI / 2, Math.PI, 0]}
    >
      <coneBufferGeometry args={[1, 0, 3, 1]}></coneBufferGeometry>
      <meshStandardMaterial color={"white"} depthTest={true} />
    </mesh>
  );
};

export default Pointer;
