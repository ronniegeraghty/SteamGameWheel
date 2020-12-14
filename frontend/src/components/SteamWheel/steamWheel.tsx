import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "../../functions/FetchUserInfo";
import UserInfo from "../../interfaces/UserInfo.interface";
import Login from "../Login/login";
import SteamUser from "../SteamUser/steamUser";

const SteamWheel = () => {
  const [submitedUserName, setSubmitedUserName] = useState<string | undefined>(
    undefined
  );
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  useEffect(() => {
    if (submitedUserName) {
      fetchUserInfo(submitedUserName)?.then((response) =>
        setUserInfo(response)
      );
    }
  }, [submitedUserName]);
  return (
    <div>
      {userInfo ? (
        <SteamUser userInfo={userInfo} />
      ) : (
        <Login
          setUserInfoCB={(userName: string) => setSubmitedUserName(userName)}
        />
      )}
    </div>
  );
};

export default SteamWheel;
