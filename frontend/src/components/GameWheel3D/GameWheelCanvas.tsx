import React, { useCallback, useEffect, useState } from "react";
import { useAppState } from "../../hooks/useAppState";
import { useUser } from "../../hooks/UseUser";
import { useWheel } from "../../hooks/useWheel";
import { Canvas } from "@react-three/fiber";
import GameWheel3D from "./GameWheel3D";
import Pointer from "./Pointer";
import "./GameWheelCanvas.css";
import GameTitle from "./GameTitle";
const GameWheelCanvas = () => {
  const appStateContext = useAppState();
  const userContext = useUser();
  const [rotation, setRotation] = useState(0);
  const wheelContext = useWheel();
  const { spin, startSpin, stopSpin } = wheelContext;
  const setSpin = useCallback(
    (value: boolean) => {
      if (value) startSpin();
      else stopSpin();
    },
    [startSpin, stopSpin]
  );
  const [segmentAmount, setSegmentAmnout] = useState(0);
  useEffect(() => {
    if (appStateContext.debugModeEnable) {
      setSegmentAmnout(appStateContext.testArr.length);
    } else if (userContext.user) {
      setSegmentAmnout(userContext.user.games.length);
    }
  }, [
    appStateContext.testArr.length,
    appStateContext.debugModeEnable,
    userContext.user,
  ]);
  return (
    <div className="Canvas">
      {appStateContext.debugModeEnable && (
        <div className="debugTools">
          <h5 style={{ color: "#FFFFFF" }}>Rotation: {rotation}</h5>
          <button onClick={(event) => setSpin(!spin)}>
            {spin ? "Stop" : "Spin"}
          </button>
        </div>
      )}
      {(userContext.userFound || appStateContext.debugModeEnable) && (
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <GameWheel3D
            setRotation={setRotation}
            spin={spin}
            setSpin={setSpin}
            segmentAmount={segmentAmount}
            appStateContext={appStateContext}
            userContext={userContext}
            wheelContext={wheelContext}
          />
          <Pointer position={segmentAmount} />
          <GameTitle wheelContext={wheelContext} />
        </Canvas>
      )}
    </div>
  );
};

export default GameWheelCanvas;
