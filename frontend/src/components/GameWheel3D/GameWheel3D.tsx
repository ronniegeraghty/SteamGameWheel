import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Group } from "three";
import GameWheelSegment from "./GameWheelSegment";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const [segments, setSegments] = useState<string[]>([]);

  useEffect(() => {
    let len = 10;
    let tempArr = [];
    for (let i = 0; i < len; i++) {
      tempArr.push("");
    }
    setSegments(tempArr);
  }, []);
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.05 / segments.length;
  });
  return (
    <group
      ref={group}
      position={[0, 0, -segments.length]}
      rotation={[0, 0, 0]}
      scale={active ? [2, 2, 2] : [1, 1, 1]}
      onClick={(event) => setActive(!active)}
    >
      {segments.map((color, index) => (
        <GameWheelSegment
          key={index}
          numberOfSegments={segments.length}
          index={index}
          color={color}
        />
      ))}
    </group>
  );
};

export default GameWheel3D;
