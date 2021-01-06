import React from "react";
import GameInfo from "../../interfaces/GameInfo.interface";
import "./WheelItem.css";
type propsType = {
  game: GameInfo;
};
const WheelItem = ({ game }: propsType) => {
  const imageURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`;
  return (
    <div className="WheelItem">
      {game.name}
      <img src={imageURL} alt={game.name + " Image"} className="GameImage" />
    </div>
  );
};

export default WheelItem;
