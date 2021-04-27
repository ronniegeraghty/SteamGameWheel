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
  //Component Constants
  const twoPI = 2 * Math.PI;
  const degPerSeg = twoPI / segments.length;
  //Ref to 3D GameWheel Object
  const group = useRef<Group>();
  //Component State
  const [state, setState] = useState("initialState");
  const [speed, setSpeed] = useState(0.25);
  const [spinDrag, setSpinDrag] = useState<number | null>(0.1);
  const [stopSpeed, setStopSpeed] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedScale, setSelectedScale] = useState(1);
  const [distanceToCenter, setDistanceToCenter] = useState<number | null>(null);
  const startSpin = () => {
    if (group.current) {
      setState("spinning");
      // Randomly Set Starting point
      group.current.rotation.y = Math.random() * twoPI;
      // Reset Wheel State to start spin
      setSpeed(twoPI);
      setSpinDrag(null);
      setStopSpeed(null);
      setSelected(null);
      setSelectedScale(1);
      setDistanceToCenter(null);
    }
  };
  const segmentFromRotation = (rotation: number): number => {
    let normRotation = rotation % twoPI;
    let segment = segments.length - Math.floor(normRotation / degPerSeg) - 1;
    return segment;
  };
  useFrame((sceneState, delta) => {
    if (group.current) {
      if (state === "initialState") {
        // Inital slow spin while waiting for first spin
        group.current.rotation.y += speed * delta * degPerSeg;
        // If Spin Button Clicked
        if (spin) startSpin();
      } else if (state === "spinning") {
        //console.log(`Speed: ${speed}`);
        // Spin
        if (!spinDrag || !stopSpeed) {
          setStopSpeed(0.4255 * Math.pow(segments.length, -1.245));
          if (stopSpeed) setSpinDrag((speed - stopSpeed) / 5);
        } else {
          group.current.rotation.y += speed * delta;
          // Decrease speed
          setSpeed(speed - (delta * speed) / spinDrag);
          //setSpinDrag(speed / 2);
          //Stop spin if speed low
          if (speed <= stopSpeed || !spin) {
            setState("stopped");
            setSpin(false);
            setRotation(group.current.rotation.y % twoPI);
            //Set selected segment
            setSelected(segmentFromRotation(group.current.rotation.y));
          }
        }
      } else if (state === "stopped") {
        //Rotate to center of selected segment
        //Make sure Select is not null
        if (selected !== null) {
          //Constants
          let centerOfSelectedSegment =
            twoPI - Math.PI / segments.length - selected * degPerSeg;
          let normRotation = group.current.rotation.y % twoPI;
          let direction = centerOfSelectedSegment - normRotation > 0 ? 1 : -1;
          if (
            Math.abs(normRotation - centerOfSelectedSegment) <
            degPerSeg * 0.0101
          ) {
            //Close to the center of selected Segment
            group.current.rotation.y = centerOfSelectedSegment;
          } else if (normRotation !== centerOfSelectedSegment) {
            //Not close to the center of the selected Segment
            if (distanceToCenter === null) {
              //Distance to center not set yet
              setDistanceToCenter(
                Math.abs(normRotation - centerOfSelectedSegment)
              );
            } else {
              //Move towards center and start up-scale of segment
              group.current.rotation.y +=
                direction * delta * (distanceToCenter / 0.5);
              setSelectedScale(
                selectedScale + (delta * 0.1 * (10 / segments.length)) / 0.5
              );
            }
          }
        }
        // Clicked spin button again
        if (spin) startSpin();
      }
    }
  });
  return (
    <group
      ref={group}
      position={[0, 0, -segments.length]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
    >
      {segments.map((color, index) => (
        <GameWheelSegment
          key={index}
          numberOfSegments={segments.length}
          index={index}
          addLineSegments={true}
          selected={selected === index}
          selectedScale={selectedScale}
        />
      ))}
    </group>
  );
};

export default GameWheel3D;
