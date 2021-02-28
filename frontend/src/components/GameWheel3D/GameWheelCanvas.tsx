import React from "react";
import { Canvas } from "react-three-fiber";
import GameWheel3D from "./GameWheel3D";

const GameWheelCanvas = () => {
  return (
    <div style={{ height: "70%" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GameWheel3D />
      </Canvas>
    </div>
  );
};

export default GameWheelCanvas;
