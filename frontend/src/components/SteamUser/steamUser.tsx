import UserInfo from "../../interfaces/UserInfo.interface";
import React from "react";
import GameInfo from "../../interfaces/GameInfo.interface";

type propsType = {
  userInfo: UserInfo;
};
const steamUser = ({ userInfo }: propsType) => {
  return (
    <div>
      <h1>Welcome {userInfo.personaname}</h1>
      <img src={userInfo.avatarfull} alt="User Avatar Img" />
      <ul>
        {userInfo.games.map((game: GameInfo) => (
          <li key={game.appid}>
            <img
              src={
                "http://media.steampowered.com/steamcommunity/public/images/apps/" +
                game.appid +
                "/" +
                game.img_icon_url +
                ".jpg"
              }
              alt="Game Icon"
            />
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default steamUser;
