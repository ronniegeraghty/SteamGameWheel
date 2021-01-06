import React from "react";
type propsType = {
  gameTitle: string;
  gameImageURL: string;
};
const WheelItem = ({ gameTitle, gameImageURL }: propsType) => {
  return (
    <div className="WheelItem">
      <div className="GameTitle">{gameTitle}</div>
      <div className="GameImage">image</div>
    </div>
  );
};

export default WheelItem;
