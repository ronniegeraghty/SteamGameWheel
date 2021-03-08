import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import GameWheel3D from "./GameWheel3D";

const GameWheelCanvas = () => {
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState<string[]>([]);
  const [changeAmount, setChangeAmount] = useState(0.01);
  const [spin, setSpin] = useState(false);
  const Rotate = (increase: boolean) => {
    if (increase) setRotation(rotation + changeAmount);
    else setRotation(rotation - changeAmount);
  };
  useEffect(() => {
    var len = 100;
    var temp = [];
    for (var i = 0; i < len; i++) {
      temp.push(" ");
    }
    setSegments(temp);
    setChangeAmount((2 * Math.PI) / len);
  }, []);
  return (
    <div style={{ height: "50%" }}>
      <h5 style={{ color: "#FFFFFF" }}>Rotation: {rotation}</h5>
      <button onClick={(event) => setSpin(!spin)}>Toggle Spin</button>
      <button onClick={(event) => Rotate(false)}>left</button>
      <button onClick={(event) => Rotate(true)}>right</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GameWheel3D
          segments={segments}
          rotation={rotation}
          setRotation={setRotation}
          spin={spin}
        />
      </Canvas>
    </div>
  );
};

export default GameWheelCanvas;
