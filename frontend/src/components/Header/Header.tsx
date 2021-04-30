import React from "react";
import Login from "../Login/Login";
import SpinButton from "../SpinButton/SpinButton";
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
      height: !userFound ? height : height,
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
        }}
      >
        <div
          ref={heightRef}
          style={{ display: !userFound ? "block" : "block" }}
        >
          {userFound ? <SpinButton /> : <Login />}
        </div>
      </animated.div>
    </div>
  );
};

export default Header;
