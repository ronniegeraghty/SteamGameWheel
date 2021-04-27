import React, { useRef } from "react";
import { Mesh } from "three";

type PropTypes = {
  position: number;
};

const Pointer = ({ position }: PropTypes) => {
  const pointer = useRef<Mesh>();
  return (
    <mesh
      ref={pointer}
      position={[0, 1.8, 0.1]}
      scale={[0.5, 0.5, 0.5]}
      rotation={[-Math.PI / 2, Math.PI, 0]}
    >
      <coneBufferGeometry args={[1, 0, 3, 1]}></coneBufferGeometry>
      <meshStandardMaterial color={"white"} depthTest={true} />
    </mesh>
  );
};

export default Pointer;
