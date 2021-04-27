import React, { useState } from "react";
import AppState from "../../interfaces/AppState";
import Login from "../Login/Login";
import UserIcon from "../UserIcon/UserIcon";
import { useSpring, animated, config } from "react-spring";
import "./Header.css";
import { useHeight } from "../../hooks/UseHeight";
import { useUser } from "../../hooks/UseUser";

const Header = () => {
  const { userFound } = useUser();
  const slideInFromTopStyles = useSpring({
    config: {
      duration: 500,
      ...config.stiff,
    },
    from: { marginTop: -50, opacity: 0 },
    to: {
      marginTop: userFound ? 0 : -50,
      opacity: userFound ? 1 : 0,
    },
  });
  const [heightRef, height] = useHeight();
  const heightChangeStyles = useSpring({
    config: { ...config.stiff },
    from: { height: height },
    to: {
      height: !userFound ? height + 50 : 0,
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
        {userFound && <UserIcon />}
      </animated.div>
      <animated.div
        style={{
          ...heightChangeStyles,
          overflow: "hidden",
        }}
      >
        <div
          ref={heightRef}
          style={{ display: !userFound ? "block" : "inline" }}
        >
          {!userFound && <Login />}
        </div>
      </animated.div>
    </div>
  );
};

export default Header;
