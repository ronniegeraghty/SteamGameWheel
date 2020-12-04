import React, { useState } from "react";
import styles from "./login.module.css";
import { SteamID } from "../../functions/SteamID";
const Login = () => {
  const [userName, setUserName] = useState("");
  const getGames = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(`USERNAME: ${userName}`);
    const steamID = await SteamID(userName);
    console.log(`STEAM ID: ${steamID}`);
  };
  return (
    <div className={styles.login}>
      <form onSubmit={getGames}>
        <input
          type="text"
          name="SteamUserName"
          value={userName}
          placeholder="Steam UserName"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <button onClick={getGames}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
