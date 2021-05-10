import React, { useEffect, useState, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Font, FontLoader, TextBufferGeometry, TextGeometry } from "three";
import { WheelContextType } from "../../hooks/useWheel";
type PropTypes = {
  wheelContext: WheelContextType;
  position: number;
};
const GameTitle = ({ wheelContext, position }: PropTypes) => {
  const [font, setFont] = useState<Font>();
  const [scale, setScale] = useState(1);
  const [textGeo, setTextGeo] = useState<TextBufferGeometry>();

  useEffect(() => {
    if (wheelContext.selectedGameName) {
      console.log(wheelContext.selectedGameName);
    }
    if (!font) {
      const loader = new FontLoader();
      loader.load("/fonts/Roboto_Bold.json", (responseFont) =>
        setFont(responseFont)
      );
    }
    if (font) {
      setTextGeo(
        new TextGeometry("Test", {
          font: font,
          size: 10,
          height: 1,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThickness: 1,
          bevelSize: 1,
          bevelOffset: 0,
          bevelSegments: 1,
        })
      );
    }
  }, [font, wheelContext.selectedGameName]);
  return (
    <group>
      {font && (
        <mesh scale={scale} geometry={textGeo}>
          {/* <textGeometry args={["Test", { font }]}></textGeometry> */}
          <meshStandardMaterial color={"white"} depthTest={false} />
        </mesh>
      )}
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"black"} />
      </mesh>
    </group>
  );
};

export default GameTitle;
