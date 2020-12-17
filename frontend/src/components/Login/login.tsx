import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserName(e.target.value);
  };
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`USERNAME: ${userName}`);
  };
  return (
    <div className="Login">
      <form className="LoginForm" onSubmit={login}>
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
    </div>
  );
};

export default Login;
