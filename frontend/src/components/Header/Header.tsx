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
  logoffCB: () => void;
};
const Header = ({ appState, setUserInfoCB, logoffCB }: propsType) => {
  const slideInFromTopStyles = useSpring({
    config: {
      duration: 500,
      ...config.stiff,
    },
    from: { marginTop: -50, opacity: 0 },
    to: {
      marginTop: appState.userInfo ? 0 : -50,
      opacity: appState.userInfo ? 1 : 0,
    },
  });
  const [heightRef, height] = useHeight();
  const heightChangeStyles = useSpring({
    config: { ...config.stiff },
    from: { height: height },
    to: {
      height: !appState.userInfo ? height + 50 : 0,
    },
  });

  return (
    <div className="Header">
      <h1 className="brand">STEAM GAME WHEEL</h1>
      <animated.div
        style={{
          ...slideInFromTopStyles,
          display: "inline",
          float: "right",
        }}
      >
        {appState.userInfo && (
          <UserIcon appState={appState} logoffCB={logoffCB} />
        )}
      </animated.div>
      <animated.div
        style={{
          ...heightChangeStyles,
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
