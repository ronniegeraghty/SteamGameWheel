import React from "react";
type PropTypes = {
  numberOfSegments: number;
  index: number;
  color: string;
};
const GameWheelSegment = ({ numberOfSegments, index, color }: PropTypes) => {
  return (
    <mesh
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
      rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
    >
      <cylinderBufferGeometry
        args={[1, 1, 1, 1, 1, false, 0, (2 * Math.PI) / numberOfSegments]}
      />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default GameWheelSegment;
