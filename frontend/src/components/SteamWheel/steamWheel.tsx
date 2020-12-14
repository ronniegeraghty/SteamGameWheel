import React, { useState } from "react";
import Login from "../Login/login";
import SteamUser from "../SteamUser/steamUser";

const SteamWheel = () => {
  const [userInfo, setUserInfo] = useState<object | undefined>(undefined);
  return <div>{userInfo ? <SteamUser /> : <Login />}</div>;
};

export default SteamWheel;
