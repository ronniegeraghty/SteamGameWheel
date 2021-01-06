import React from "react";
import AppState from "../../interfaces/AppState";
import WheelItem from "./WheelItem";
type propsType = {
  appState: AppState;
};
const SteamGameWheel = ({ appState }: propsType) => {
  return (
    <div>
      <h1>Steam Game Wheel</h1>
      <div className="Wheel">
        {appState.userInfo?.games.map((game) => (
          <WheelItem gameTitle={game.name} gameImageURL={game.img_logo_url} />
        ))}
      </div>
    </div>
  );
};

export default SteamGameWheel;
