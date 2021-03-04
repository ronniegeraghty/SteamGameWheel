import React, { useEffect, useState } from "react";
import getColor from "./getColor";

type PropTypes = {
  numberOfSegments: number;
  index: number;
  color: string;
};
const GameWheelSegment = ({ numberOfSegments, index, color }: PropTypes) => {
  const [newColor, setNewColor] = useState("#000000");
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    setRadius(numberOfSegments);
    setNewColor(getColor(index, numberOfSegments));
  }, [index, numberOfSegments]);

  return (
    <mesh
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
    >
      <cylinderBufferGeometry
        args={[
          radius,
          radius,
          3,
          1,
          1,
          false,
          0,
          (2 * Math.PI) / numberOfSegments,
        ]}
      />
      <meshStandardMaterial color={newColor} />
    </mesh>
  );
};

export default GameWheelSegment;
