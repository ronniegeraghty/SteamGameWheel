import React, { useState, useRef } from "react";
import "./Login.css";
import { useUser } from "../../hooks/UseUser";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [emptyUserName, setEmptyUserName] = useState(false);
  const userNameInput = useRef<HTMLInputElement>(null);
  const { userFound, login, logoff } = useUser();
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
    setEmptyUserName(false);
    logoff();
  };
  const loginButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userName === "") {
      setEmptyUserName(true);
      if (userNameInput.current) userNameInput.current.focus();
    } else login(userName);
  };
  return (
    <div className="Login">
      <form
        className={
          !(userFound === false || emptyUserName)
            ? "LoginForm"
            : "LoginFormUserNotFound"
        }
        onSubmit={loginButton}
      >
        <input
          className="UserNameInput"
          type="text"
          name="SteamUserName"
          value={userName}
          placeholder="Steam Username"
          ref={userNameInput}
          onChange={handleUserNameChange}
        />
        <button className="LoginButton" type="submit">
          Login
        </button>
      </form>
      {(userFound === false || emptyUserName) && (
        <span className="NoUserFoundText">
          {emptyUserName
            ? "You must provide a Steam UserName!"
            : "Steam User Not Found!"}
        </span>
      )}
    </div>
  );
};

export default Login;
