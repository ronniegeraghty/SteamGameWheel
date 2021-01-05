import React, { useState } from "react";
import AppState from "../../interfaces/AppState";
import "./Login.css";

type propsType = {
  appState: AppState;
  setUserInfoCB: (submitedUserName: string) => void;
};

const Login = ({ appState, setUserInfoCB }: propsType) => {
  const [userName, setUserName] = useState<string>("");
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInfoCB(userName);
  };
  return (
    <div className="Login">
      <form
        className={
          appState.foundSteamUser ? "LoginForm" : "LoginFormUserNotFound"
        }
        onSubmit={login}
      >
        <input
          className="UserNameInput"
          type="text"
          name="SteamUserName"
          value={userName}
          placeholder="Steam Username"
          onChange={handleUserNameChange}
        />
        <button className="LoginButton" type="submit">
          Login
        </button>
      </form>
      {!appState.foundSteamUser && (
        <span className="NoUserFoundText">Steam User Not Found!</span>
      )}
    </div>
  );
};

export default Login;
