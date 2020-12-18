import React, { useState } from "react";
import AppState from "../../interfaces/AppState";
import "./UserIcon.css";
import UserIconMenu from "./UserIconMenu";
type propsType = {
  appState: AppState;
};
const UserIcon = ({ appState }: propsType) => {
  const [showUserIconMenau, setShowUserIconMenau] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowUserIconMenau(!showUserIconMenau);
  };
  return (
    <div className="UserIcon" onClick={handleClick}>
      <div className="UserName">{appState.userInfo?.personaname}</div>
      <img
        className="SteamAvatar"
        src={appState.userInfo?.avatarfull}
        alt="Steam Avatar"
      />
      {showUserIconMenau && <UserIconMenu />}
    </div>
  );
};

export default UserIcon;
