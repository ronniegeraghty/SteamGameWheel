import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Mesh, MeshPhongMaterial } from "three";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();
  const [active, setActive] = useState(false);
  const [materials, setMaterials] = useState<MeshPhongMaterial[]>([]);
  useEffect(() => {
    var materialTop = new MeshPhongMaterial({ color: "red" });
    var materialSide = new MeshPhongMaterial({ color: "blue" });
    var materialBottom = new MeshPhongMaterial({ color: "yellow" });
    var materialsArray = [];
    materialsArray.push(materialTop);
    materialsArray.push(materialSide);
    materialsArray.push(materialBottom);
    setMaterials(materialsArray);
  }, []);
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      position={[0, 0, 0]}
      ref={mesh}
      material={materials}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      rotation={[0.2, 0, 0]}
      onClick={(event) => setActive(!active)}
    >
      <cylinderBufferGeometry args={[1, 1, 1, 6]} />
    </mesh>
  );
};

export default GameWheel3D;
