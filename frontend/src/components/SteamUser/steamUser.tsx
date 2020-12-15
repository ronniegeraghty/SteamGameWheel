import UserInfo from "../../interfaces/UserInfo.interface";
import React from "react";
import GameWheel from "../GameWheel/gameWheel";

type propsType = {
  userInfo: UserInfo;
};
const steamUser = ({ userInfo }: propsType) => {
  return (
    <div>
      <h1>Welcome {userInfo.personaname}</h1>
      {/* <img src={userInfo.avatarfull} alt="User Avatar Img" /> */}
      <GameWheel games={userInfo.games} />
    </div>
  );
};

export default steamUser;
