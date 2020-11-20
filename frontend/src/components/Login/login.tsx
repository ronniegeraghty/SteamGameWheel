import React, { useState } from "react";
import stypes from "./login.module.css";
const Login = () => {
  const [userName, setUserName] = useState("");
  const getGames = async () => {
    let games = await fetch(`/api/steam-games/${userName}`).then((response) => {
      if (!response.ok) {
        throw Error(`Caught Error: ${response.statusText}`);
      }
      return response.json();
    });
    console.log(`JSON RES: ${JSON.stringify(games)}`);
  };
  return (
    <div className={stypes.login}>
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
    </div>
  );
};

export default Login;
