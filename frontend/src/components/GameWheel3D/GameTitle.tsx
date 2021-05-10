import React, { useEffect } from "react";
import { WheelContextType } from "../../hooks/useWheel";
type PropTypes = {
  wheelContext: WheelContextType;
};
const GameTitle = ({ wheelContext }: PropTypes) => {
  useEffect(() => {
    if (wheelContext.selectedGameName) {
      console.log(wheelContext.selectedGameName);
    }
  }, [wheelContext.selectedGameName]);
  return <mesh></mesh>;
};

export default GameTitle;
