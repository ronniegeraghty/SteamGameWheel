import React from "react";
import { Canvas } from "react-three-fiber";
import Wheel from "./Wheel";

const GameWheel3D = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Wheel position={[0, 0, 0]} />
    </Canvas>
  );
};

export default GameWheel3D;
