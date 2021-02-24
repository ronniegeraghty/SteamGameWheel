import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, MeshProps, useFrame, useLoader } from "react-three-fiber";
import { Mesh } from "three";

type PropTypes = { position: number[] };

const Wheel = (props: PropTypes) => {
  const [texture1] = useLoader(THREE.TextureLoader, [
    "https://miro.medium.com/max/1000/0*tYTUz4Mfm-t5dz1S.png",
  ]);

  const mesh = useRef<Mesh>();
  const [active, setActive] = useState(false);

  //Materials

  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
    >
      <cylinderBufferGeometry args={[2, 2, 1, 6]} />
      <meshBasicMaterial color={"hotpink"} />
    </mesh>
  );
};

export default Wheel;
