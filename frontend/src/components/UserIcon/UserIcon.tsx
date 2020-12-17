import React from "react";
import AppState from "../../interfaces/AppState";
import "./UserIcon.css";
type propsType = {
  appState: AppState;
};
const UserIcon = ({ appState }: propsType) => {
  return (
    <div className="UserIcon">
      <div className="UserName">{appState.userInfo?.personaname}</div>
      <img className='SteamAvatar' src={appState.userInfo?.avatarfull} alt="Steam Avatar" />
    </div>
  );
};

export default UserIcon;
