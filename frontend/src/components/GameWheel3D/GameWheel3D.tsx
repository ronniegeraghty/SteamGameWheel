import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Group } from "three";
import GameWheelSegment from "./GameWheelSegment";

type PropTypes = {
  segments: string[];
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  spin: boolean;
  setSpin: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameWheel3D = ({
  segments,
  rotation,
  setRotation,
  spin,
  setSpin,
}: PropTypes) => {
  const initSpeed = (2 * Math.PI) / segments.length;
  const initDragFactor = 0.01;
  const group = useRef<Group>();
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(initSpeed);
  const [dragFactor, setDragFactor] = useState(initDragFactor);
  const [spinning, setSpinning] = useState(false);

  useFrame(() => {
    if (group.current) {
      if (spin && !spinning) {
        setSpinning(true);
      } else if (!spin && spinning) {
        setSpinning(false);
        setRotation(group.current.rotation.y % (2 * Math.PI));
      }
      if (spinning) {
        console.log(`SPEED: ${speed}`);
        group.current.rotation.y += speed;
        if (speed - 0.0005 <= 0) {
          setSpeed(initSpeed);
          setDragFactor(initDragFactor);
          setSpinning(false);
          setSpin(false);
          setRotation(group.current.rotation.y % (2 * Math.PI));
        } else {
          setSpeed(speed - speed * dragFactor);
        }
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
