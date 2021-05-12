import { Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
  Font,
  FontLoader,
  Group,
  Mesh,
  TextGeometryParameters,
  Vector3,
} from "three";
import { WheelContextType } from "../../hooks/useWheel";
type PropTypes = {
  wheelContext: WheelContextType;
};
const GameTitle = ({ wheelContext }: PropTypes) => {
  const { selectedGameName } = wheelContext;
  const [font, setFont] = useState<Font>();
  //const [scale, setScale] = useState(0);
  //const [position, setPosition] = useState<Vector3>(new Vector3(0, 0, 0));
  const [
    textGeoParamerter,
    setTextGeoParamerter,
  ] = useState<TextGeometryParameters>();
  const text = useRef<Mesh>();

  useEffect(() => {
    if (wheelContext.selectedGameName) {
      //console.log(wheelContext.selectedGameName);
    }
    if (!font) {
      const loader = new FontLoader();
      loader.load("/fonts/Roboto_Bold.json", (responseFont) =>
        setFont(responseFont)
      );
    }
    if (font && !textGeoParamerter) {
      setTextGeoParamerter({
        font: font,
        size: 1,
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      });
    }
    if (text.current) {
      text.current.scale.set(0, 0, 0);
      text.current.geometry.computeBoundingBox();
      let testVec = new Vector3();
      text.current.geometry.boundingBox?.getSize(testVec);
      console.log(`Text: ${testVec.toArray().toString()}`);
    }
  }, [
    font,
    selectedGameName,
    textGeoParamerter,
    wheelContext.selectedGameName,
  ]);
  let newScale = 0;
  let direction = 1;
  useFrame((sceneState, delta) => {
    let scaleLimit = sceneState.viewport.width / 50;
    if (text.current) {
      text.current.geometry.center();
      text.current.rotation.y += 0.1;

      let scaleChange = (scaleLimit / 2) * delta;
      if (text.current.scale.x >= scaleLimit) {
        direction = -1;
      } else if (text.current.scale.x <= 0) {
        direction = 1;
      }
      newScale = text.current.scale.x + direction * scaleChange;
      text.current.scale.set(newScale, newScale, newScale);
    }
  });

  return (
    <group position={[0, 1.8, 2]}>
      {selectedGameName && textGeoParamerter && (
        <mesh ref={text}>
          <textGeometry
            args={[`${selectedGameName}`, textGeoParamerter]}
          ></textGeometry>
          <meshStandardMaterial color={"white"} depthTest={true} />
        </mesh>
      )}
    </group>
  );
};

export default GameTitle;
