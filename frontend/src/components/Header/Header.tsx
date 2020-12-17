import React from "react";
import AppState from "../../interfaces/AppState";
import Login from "../Login/Login";
import "./Header.css";

type propsType = {
  appState: AppState;
  setUserInfoCB: (submitedUserName: string) => void;
};
const Header = ({ appState, setUserInfoCB }: propsType) => {
  return (
    <div className="Header">
      <h1 className="brand">STEAM GAME WHEEL</h1>
      {appState.userInfo ? (
        appState.userInfo.personaname
      ) : (
        <Login appState={appState} setUserInfoCB={setUserInfoCB} />
      )}
    </div>
  );
};

export default Header;
