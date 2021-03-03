import React, { useEffect, useState } from "react";
const HIGHEST_DEC_FOR_HEX_COLOR = 1530;
type PropTypes = {
  numberOfSegments: number;
  index: number;
  color: string;
};
const GameWheelSegment = ({ numberOfSegments, index, color }: PropTypes) => {
  const [newColor, setNewColor] = useState("000000");
  const getColor = (): string => {
    console.log(`INDEX: ${index}`);
    let normalizedNum = (HIGHEST_DEC_FOR_HEX_COLOR * index) / numberOfSegments;
    console.log(`NormalizedNumber: ${normalizedNum}`);
    let red = 255;
    let green = 0;
    let blue = 0;
    //RED -> ORANGE
    if (normalizedNum > 255) {
      green = 127;
      normalizedNum -= 255;
    } else {
      green = (127 * normalizedNum) / 255;
      normalizedNum = 0;
    }
    //ORANGE -> YELLOW
    if (normalizedNum > 255) {
      green = 255;
      normalizedNum -= 255;
    } else {
      green += (127 * normalizedNum) / 255;
      normalizedNum = 0;
    }
    //YELLOW -> GREEN
    if (normalizedNum > 255) {
      red = 0;
      normalizedNum -= 255;
    } else {
      red -= normalizedNum;
      normalizedNum = 0;
    }
    //GREEN -> BLUE
    if (normalizedNum > 255) {
      green = 0;
      blue = 255;
      normalizedNum -= 255;
    } else {
      green -= normalizedNum;
      blue += normalizedNum;
      normalizedNum = 0;
    }
    //BLUE -> INDIGO
    if (normalizedNum > 255) {
      red = 75;
      blue = 130;
      normalizedNum -= 255;
    } else {
      red = (75 * normalizedNum) / 255;
      blue -= (125 * normalizedNum) / 255;
      normalizedNum = 0;
    }
    //INDIGO -> RED
    red += (180 * normalizedNum) / 255;
    blue -= (130 * normalizedNum) / 255;

    //Round Color Values
    red = Math.round(red);
    green = Math.round(green);
    blue = Math.round(blue);

    console.log(`RED: ${red}\nGREEN:${green}\nBLUE:${blue}`);
    let hexColor =
      "#" + decToColorHex(red) + decToColorHex(green) + decToColorHex(blue);
    console.log(`HEX_COLOR: ${hexColor}`);
    return hexColor;
  };
  const decToColorHex = (dec: number) => {
    if (dec > 255) {
      console.log("Dec outside of possible hex colors");
      return "00";
    }
    let hexString = dec.toString(16);
    let dif = 2 - hexString.length;
    for (var i = 0; i < dif; i++) {
      hexString = "0" + hexString;
    }
    return hexString;
  };

  useEffect(() => {
    setNewColor(getColor());
  }, []);

  return (
    <mesh
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
    >
      <cylinderBufferGeometry
        args={[1, 1, 1, 1, 1, false, 0, (2 * Math.PI) / numberOfSegments]}
      />
      <meshStandardMaterial color={newColor} />
    </mesh>
  );
};

export default GameWheelSegment;
