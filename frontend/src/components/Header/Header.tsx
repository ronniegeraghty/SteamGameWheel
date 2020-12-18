import React, { useState, useEffect } from "react";
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
  const [toggle, setToggle] = useState<boolean>(false);
  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0, height: 0 },
    to: {
      opacity: toggle ? 1 : 0,
      height: toggle ? height + 50 : 0,
    },
  });
  useEffect(() => {
    console.log(`Height: ${height}`);
  }, [height]);
  return (
    <div className="Header">
      <h1 className="brand">STEAM GAME WHEEL</h1>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Toggle
      </button>
      <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
        <div ref={heightRef}>
          {appState.userInfo ? (
            <UserIcon appState={appState} />
          ) : (
            <Login appState={appState} setUserInfoCB={setUserInfoCB} />
          )}{" "}
        </div>
      </animated.div>
    </div>
  );
};

export default Header;
