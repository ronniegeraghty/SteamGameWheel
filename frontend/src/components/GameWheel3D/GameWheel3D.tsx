import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Group } from "three";
import GameWheelSegment from "./GameWheelSegment";

type PropTypes = {
  segments: string[];
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  spin: boolean;
};

const GameWheel3D = ({ segments, rotation, setRotation, spin }: PropTypes) => {
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(0.001);
  const [spinning, setSpinning] = useState(false);

  useFrame(() => {
    if (group.current) {
      if (spin && !spinning) {
        setSpinning(true);
      } else if (!spin && spinning) {
        setSpinning(false);
        setRotation(group.current.rotation.y);
      }
      if (spinning) {
        group.current.rotation.y += speed;
      }
    }
  });
  return (
    <group
      ref={group}
      position={[0, 1, -segments.length]}
      rotation={[0.025, 0, 0]}
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
