import React, { useState } from "react";
import "./Login.css";
import { useUser } from "../../hooks/UseUser";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const { userFound, login } = useUser();
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
        className={
          !(userFound === false) ? "LoginForm" : "LoginFormUserNotFound"
        }
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
      {userFound === false && (
        <span className="NoUserFoundText">Steam User Not Found!</span>
      )}
    </div>
  );
};

export default Login;
