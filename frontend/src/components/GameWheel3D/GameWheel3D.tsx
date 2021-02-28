import React, { useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Mesh } from "three";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      userData={{ hello: "world" }}
      position={[0, 0, 0]}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      rotation={[0.2, 0, 0]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => {
        setHovered(true);
      }}
      onPointerOut={(event) => {
        setHovered(false);
      }}
    >
      <cylinderBufferGeometry args={[1, 1, 1, 6]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

export default GameWheel3D;
