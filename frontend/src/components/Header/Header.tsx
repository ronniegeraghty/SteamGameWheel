import React from "react";
import AppState from "../../interfaces/AppState";
import Login from "../Login/Login";
import UserIcon from "../UserIcon/UserIcon";
import { useSpring, animated, config } from "react-spring";
import "./Header.css";
import { useHeight } from "../../hooks/UseHeight";

type propsType = {
  appState: AppState;
  setUserInfoCB: (submitedUserName: string) => void;
};
const Header = ({ appState, setUserInfoCB }: propsType) => {
  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: { height: height },
    to: {
      height: !appState.userInfo ? height + 50 : 10,
    },
  });

  return (
    <div className="Header">
      <h1 className="brand">STEAM GAME WHEEL</h1>
      {appState.userInfo && <UserIcon appState={appState} />}
      <animated.div
        style={{
          ...slideInStyles,
          overflow: "hidden",
        }}
      >
        <div
          ref={heightRef}
          style={{ display: !appState.userInfo ? "block" : "inline" }}
        >
          {!appState.userInfo && (
            <Login appState={appState} setUserInfoCB={setUserInfoCB} />
          )}
        </div>
      </animated.div>
    </div>
  );
};

export default Header;
