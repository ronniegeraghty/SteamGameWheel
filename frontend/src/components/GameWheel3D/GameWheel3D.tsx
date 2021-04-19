import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
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
  const twoPI = 2 * Math.PI;
  const cirPerSeg = twoPI / segments.length;
  const [state, setState] = useState("initialState");
  const [speed, setSpeed] = useState(0.05 * cirPerSeg);
  const group = useRef<Group>();
  const [selected, setSelected] = useState<number | null>(null);
  const startSpin = () => {
    if (group.current) {
      setState("spinning");
      // Randomly Set Starting point
      group.current.rotation.y = Math.random() * twoPI;
      // Set Spin Starting Speed
      setSpeed(twoPI);
    }
  };
  const segmentFromRotation = (rotation: number): number => {
    let normRotation = rotation % twoPI;
    let segment = segments.length - Math.floor(normRotation / cirPerSeg) - 1;
    console.log(`SEGMENT: ${segment}`);
    return segment;
  };

  useFrame(() => {
    if (group.current) {
      if (state === "initialState") {
        // Inital slow spin while waiting for first spin
        group.current.rotation.y += speed * cirPerSeg;
        // If Spin Button Clicked
        if (spin) startSpin();
      } else if (state === "spinning") {
        console.log(`Speed: ${speed}`);
        // Spin
        group.current.rotation.y += speed * cirPerSeg;
        // Decrease speed
        setSpeed(speed - speed / segments.length);
        //Stop spin if speed low
        if (speed <= 0.001) {
          setState("stopped");
          setSpin(false);
          setRotation(group.current.rotation.y % twoPI);
          //Set selected segment
          setSelected(segmentFromRotation(group.current.rotation.y));
        }
      } else if (state === "stopped") {
        //Rotate to center of selected segment
        if (selected && group.current.rotation.y !== cirPerSeg * selected) {
          console.log(`New rotation: ${selected * cirPerSeg}`);
          group.current.rotation.y =
            twoPI - Math.PI / segments.length - selected * cirPerSeg;
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
          showSegmentNumber={true}
        />
      ))}
    </group>
  );
};

export default GameWheel3D;
