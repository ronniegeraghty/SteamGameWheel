import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Group } from "three";
import GameWheelSegment from "./GameWheelSegment";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const segments = ["red", "blue", "yellow", "green", "darkorange", "purple"];

  useEffect(() => {}, []);
  useFrame(() => {
    //if (mesh.current) mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    if (group.current) group.current.rotation.y += 0.01;
  });
  return (
    <group
      ref={group}
      rotation={[0.2, 0, 0]}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
    >
      {segments.map((color, index) => (
        <GameWheelSegment
          numberOfSegments={segments.length}
          index={index}
          color={color}
        />
      ))}
    </group>
  );
};

export default GameWheel3D;
