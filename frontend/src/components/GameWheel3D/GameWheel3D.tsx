import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, ShapeGeometry } from "three";
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
  const [state, setState] = useState("initialState");
  const [speed, setSpeed] = useState((0.05 * 2 * Math.PI) / segments.length);
  const group = useRef<Group>();
  const [selected, setSelected] = useState<number | null>(null);
  const startSpin = () => {
    if (group.current) {
      setState("spinning");
      // Randomly Set Starting point
      group.current.rotation.y = Math.random() * 2 * Math.PI;
      // Set Spin Starting Speed
      setSpeed(2 * Math.PI);
    }
  };
  const segmentFromRotation = (rotation: number): number => {
    let normRotation = rotation % (2 * Math.PI);
    let segment =
      segments.length -
      Math.floor((normRotation / (2 * Math.PI)) * segments.length) -
      1;
    console.log(`SEGMENT: ${segment}`);
    return segment;
  };

  useFrame(() => {
    if (group.current) {
      if (state === "initialState") {
        // Inital slow spin while waiting for first spin
        group.current.rotation.y += speed * ((2 * Math.PI) / segments.length);
        // If Spin Button Clicked
        if (spin) startSpin();
      } else if (state === "spinning") {
        console.log(`Speed: ${speed}`);
        // Spin
        group.current.rotation.y += speed * ((2 * Math.PI) / segments.length);
        // Decrease speed
        setSpeed(speed - speed / segments.length);
        //Stop spin if speed low
        if (speed <= 0.001) {
          setState("stopped");
          setSpin(false);
          setRotation(group.current.rotation.y % (2 * Math.PI));
          //Set selected segment
          setSelected(segmentFromRotation(group.current.rotation.y));
        }
      } else if (state === "stopped") {
        //Rotate to center of selected segment
        if (
          selected &&
          group.current.rotation.y !==
            ((2 * Math.PI) / segments.length) * selected
        ) {
          group.current.rotation.y =
            selected * ((2 * Math.PI) / segments.length);
        }
        // Clicked spin button again
        if (spin) startSpin();
      }
    }
  });
  return (
    <group
      ref={group}
      position={[0, 0.5, -segments.length]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      {segments.map((color, index) => (
        <GameWheelSegment
          key={index}
          numberOfSegments={segments.length}
          index={index}
          color={color}
          addLineSegments={true}
          selected={selected === index}
        />
      ))}
    </group>
  );
};

export default GameWheel3D;
