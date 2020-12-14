import React, { useState } from "react";
import stypes from "./login.module.css";
type propsType = {
  setUserInfoCB: (userName: string) => void;
};
const Login = ({ setUserInfoCB }: propsType) => {
  const [userName, setUserName] = useState("");
  const submitUserName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserInfoCB(userName);
  };
  return (
    <div className={stypes.login}>
      <form onSubmit={submitUserName}>
        <input
          type="text"
          name="SteamUserName"
          value={userName}
          placeholder="Steam UserName"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
