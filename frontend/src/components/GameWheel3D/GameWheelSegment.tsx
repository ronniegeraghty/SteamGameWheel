import React, { useEffect, useRef, useState } from "react";
import { useUpdate } from "react-three-fiber";
import * as THREE from "three";
import { CylinderGeometry, EdgesGeometry, LineSegments, Mesh } from "three";
import getColor from "./getColor";

type PropTypes = {
  numberOfSegments: number;
  index: number;
  color: string;
};
const GameWheelSegment = ({ numberOfSegments, index, color }: PropTypes) => {
  const [newColor, setNewColor] = useState("#000000");
  const [radius, setRadius] = useState(0);
  const cylinderMesh = useRef<Mesh>();
  const cylinderGeometry = new THREE.CylinderBufferGeometry(
    radius,
    radius,
    3,
    1,
    1,
    false,
    0,
    (2 * Math.PI) / numberOfSegments
  );
  const cylinderMaterial = new THREE.MeshBasicMaterial({ color: newColor });
  const wireFrameMesh = useRef<LineSegments>();
  const wireFrameGeometry = new THREE.EdgesGeometry(cylinderGeometry);
  const wireFrameMaterial = new THREE.LineBasicMaterial({
    color: "black",
    linewidth: 1,
    transparent: true,
    opacity: 1,
    depthTest: false,
  });

  useEffect(() => {
    setRadius(numberOfSegments);
    setNewColor(getColor(index, numberOfSegments));
  }, [index, numberOfSegments]);

  return (
    <group>
      <mesh
        ref={cylinderMesh}
        geometry={cylinderGeometry}
        material={cylinderMaterial}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
      >
        {/* <cylinderBufferGeometry
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
        <meshStandardMaterial color={newColor} /> */}
      </mesh>
      <lineSegments
        ref={wireFrameMesh}
        geometry={wireFrameGeometry}
        material={wireFrameMaterial}
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
      >
        {/* <lineBasicMaterial
          color="black"
          linewidth={3}
          resolution={[512, 512]}
          transparent
          opacity={1}
        /> */}
      </lineSegments>
    </group>
  );
};

export default GameWheelSegment;
