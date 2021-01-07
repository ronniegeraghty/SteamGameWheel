import React from "react";
import "./SteamGameWheel.css";
import AppState from "../../interfaces/AppState";
import WheelItem from "./WheelItem";
type propsType = {
  appState: AppState;
};
const SteamGameWheel = ({ appState }: propsType) => {
  return (
    <div className="SteamGameWheel">
      <div className="hideOverflow">
        <div className="Wheel">
          {appState.userInfo?.games.map((game) => (
            <WheelItem game={game} key={game.appid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SteamGameWheel;
