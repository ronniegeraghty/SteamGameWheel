import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Group, Mesh, MeshPhongMaterial } from "three";
import { getSourceMapRange } from "typescript";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();
  const group = useRef<Group>();
  const [active, setActive] = useState(false);

  useEffect(() => {}, []);
  useFrame(() => {
    //if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    if (group.current)
      group.current.rotation.x = group.current.rotation.y += 0.01;
  });
  return (
    <group ref={group}>
      <mesh
        position={[0, 0, 0]}
        ref={mesh}
        scale={active ? [2, 2, 2] : [1, 1, 1]}
        rotation={[0.2, 0, 0]}
        onClick={(event) => setActive(!active)}
      >
        <cylinderBufferGeometry
          args={[1, 1, 1, 1, 1, false, 0, (2 * Math.PI) / 3]}
        />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        ref={mesh}
        scale={active ? [2, 2, 2] : [1, 1, 1]}
        rotation={[0.2, (2 * Math.PI) / 3, 0]}
        onClick={(event) => setActive(!active)}
      >
        <cylinderBufferGeometry
          args={[1, 1, 1, 1, 1, false, 0, (2 * Math.PI) / 3]}
        />
        <meshStandardMaterial color={"forestgreen"} />
      </mesh>
      <mesh
        position={[0, 0, 0]}
        ref={mesh}
        scale={active ? [2, 2, 2] : [1, 1, 1]}
        rotation={[0.2, (4 * Math.PI) / 3, 0]}
        onClick={(event) => setActive(!active)}
      >
        <cylinderBufferGeometry
          args={[1, 1, 1, 1, 1, false, 0, (2 * Math.PI) / 3]}
        />
        <meshStandardMaterial color={"slateblue"} />
      </mesh>
    </group>
  );
};

export default GameWheel3D;
