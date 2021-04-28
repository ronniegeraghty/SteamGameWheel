import React, { useEffect, useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import { useUser } from "../../hooks/UseUser";
import { Canvas } from "@react-three/fiber";
import GameWheel3D from "./GameWheel3D";
import Pointer from "./Pointer";
import "./GameWheelCanvas.css";
const GameWheelCanvas = () => {
  const { debugModeEnable } = useAppState();
  const userContext = useUser();
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState<string[]>([]);
  const [spin, setSpin] = useState(false);
  useEffect(() => {
    var len = 50;
    var temp = [];
    for (var i = 0; i < len; i++) {
      temp.push(" ");
    }
    setSegments(temp);
  }, []);
  return (
    <div className="Canvas">
      {debugModeEnable && (
        <div className="debugTools">
          <h5 style={{ color: "#FFFFFF" }}>Rotation: {rotation}</h5>
          <button onClick={(event) => setSpin(!spin)}>
            {spin ? "Stop" : "Spin"}
          </button>
        </div>
      )}
      {(userContext.userFound || debugModeEnable) && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <GameWheel3D
            segments={segments}
            rotation={rotation}
            setRotation={setRotation}
            spin={spin}
            setSpin={setSpin}
            userContext={userContext}
          />
          <Pointer position={segments.length} />
        </Canvas>
      )}
    </div>
  );
};

export default GameWheelCanvas;
