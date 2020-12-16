import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  return (
    <div className="Login">
      <form className="LoginForm">
        <input
          className="UserNameInput"
          type="text"
          name="SteamUserName"
          value={userName}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
