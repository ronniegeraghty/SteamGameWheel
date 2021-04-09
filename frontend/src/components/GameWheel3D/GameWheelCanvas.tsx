import React, { useEffect, useState } from "react";
import { Canvas } from "react-three-fiber";
import GameWheel3D from "./GameWheel3D";

const GameWheelCanvas = () => {
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState<string[]>([]);
  const [spin, setSpin] = useState(false);
  useEffect(() => {
    var len = 100;
    var temp = [];
    for (var i = 0; i < len; i++) {
      temp.push(" ");
    }
    setSegments(temp);
  }, []);
  return (
    <div style={{ height: "50%" }}>
      <h5 style={{ color: "#FFFFFF" }}>Rotation: {rotation}</h5>
      <button onClick={(event) => setSpin(!spin)}>Spin</button>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <GameWheel3D
          segments={segments}
          rotation={rotation}
          setRotation={setRotation}
          spin={spin}
          setSpin={setSpin}
        />
      </Canvas>
    </div>
  );
};

export default GameWheelCanvas;
