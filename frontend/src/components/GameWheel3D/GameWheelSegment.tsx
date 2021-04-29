import React, { useEffect, useRef, useState } from "react";
import {
  CylinderBufferGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  Texture,
} from "three";
import getColor from "./getColor";

type PropTypes = {
  numberOfSegments: number;
  index: number;
  addLineSegments: boolean;
  selected: boolean;
  selectedScale: number;
  appid?: number;
  img?: string;
};
const GameWheelSegment = ({
  numberOfSegments,
  index,
  addLineSegments,
  selected,
  selectedScale,
  appid,
  img,
}: PropTypes) => {
  const [newColor, setNewColor] = useState("#000000");
  const [radius, setRadius] = useState(0);
  const [texture, setTexture] = useState<Texture | null>(null);
  const cylinderMesh = useRef<Mesh>();
  const cylinderGeometry = new CylinderBufferGeometry(
    radius,
    radius,
    3,
    1,
    1,
    true,
    0,
    (2 * Math.PI) / numberOfSegments
  );
  const cylinderMaterial = new MeshBasicMaterial({ color: newColor });
  const wireFrameMesh = useRef<LineSegments>();
  const wireFrameGeometry = new EdgesGeometry(cylinderGeometry);
  const wireFrameMaterial = new LineBasicMaterial({
    color: "black",
    linewidth: 5,
    transparent: true,
    opacity: 1,
    depthTest: false,
  });
  useEffect(() => {
    setRadius(numberOfSegments);
    if (appid && img)
      setTexture(new TextureLoader().load(`/api/steam-images/${appid}/${img}`));
    setNewColor(getColor(index, numberOfSegments));
  }, [img, index, numberOfSegments]);
  return (
    <group>
      <mesh
        ref={cylinderMesh}
        // geometry={cylinderGeometry}
        //material={cylinderMaterial}
        position={[0, 0, 0]}
        scale={
          selected ? [selectedScale, selectedScale, selectedScale] : [1, 1, 1]
        }
        rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
      >
        <cylinderBufferGeometry
          args={[
            radius,
            radius,
            3,
            1,
            1,
            true,
            0,
            (2 * Math.PI) / numberOfSegments,
          ]}
        />
        {texture ? (
          <meshStandardMaterial map={texture} />
        ) : (
          <meshStandardMaterial color={newColor} />
        )}
      </mesh>
      {addLineSegments && (
        <lineSegments
          ref={wireFrameMesh}
          geometry={wireFrameGeometry}
          material={wireFrameMaterial}
          position={[0, 0, 0]}
          scale={
            selected ? [selectedScale, selectedScale, selectedScale] : [1, 1, 1]
          }
          rotation={[0, (index * 2 * Math.PI) / numberOfSegments, 0]}
        >
          <lineBasicMaterial
            color="black"
            linewidth={3}
            transparent
            opacity={1}
          />
        </lineSegments>
      )}
    </group>
  );
};

export default GameWheelSegment;
