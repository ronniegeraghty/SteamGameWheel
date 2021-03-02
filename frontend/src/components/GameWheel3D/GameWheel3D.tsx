import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame } from "react-three-fiber";
import { Group } from "three";
import GameWheelSegment from "./GameWheelSegment";

const GameWheel3D: React.FC<MeshProps> = (props) => {
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const [segments, setSegments] = useState<string[]>([
    "red",
    "blue",
    "yellow",
    "purple",
    "green",
    "black",
  ]);

  useEffect(() => {
    let len = 15;
    let tempArr = [];
    for (let i = 0; i < len; i++) {
      if (len % 2 === 0) {
        if (i % 2 === 0) {
          tempArr.push("red");
        } else {
          tempArr.push("blue");
        }
      } else {
        if (i % 3 === 0) {
          tempArr.push("red");
        } else if (i % 3 === 1) {
          tempArr.push("blue");
        } else {
          tempArr.push("yellow");
        }
      }
    }
    setSegments(tempArr);
  }, []);
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
