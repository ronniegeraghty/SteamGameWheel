import React, { useState } from "react";
import AppState from "../../interfaces/AppState";
import "./Login.css";
import { useUser } from "../../hooks/UseUser";

type propsType = {
  appState: AppState;
  setUserInfoCB: (submitedUserName: string) => void;
};

const Login = ({ appState, setUserInfoCB }: propsType) => {
  const [userName, setUserName] = useState<string>("");
  const { user, login } = useUser();
  const [userStatus] = useState(!(user && user.status === "No User Found"));
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const loginButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userName);
  };
  return (
    <div className="Login">
      <form
        className={userStatus ? "LoginForm" : "LoginFormUserNotFound"}
        onSubmit={loginButton}
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
      {!userStatus && (
        <span className="NoUserFoundText">Steam User Not Found!</span>
      )}
    </div>
  );
};

export default Login;
