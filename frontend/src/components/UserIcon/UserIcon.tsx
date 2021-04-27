import React, { useState } from "react";
import { animated, config, useSpring } from "react-spring";
import AppState from "../../interfaces/AppState";
import "./UserIcon.css";
import UserIconMenu from "./UserIconMenu";
import { useUser } from "../../hooks/UseUser";

const UserIcon = () => {
  const { user } = useUser();
  const [showUserIconMenu, setShowUserIconMenau] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowUserIconMenau(!showUserIconMenu);
  };
  const slideInFromTopStyles = useSpring({
    config: {
      duration: 100,
      ...config.stiff,
    },
    from: {
      marginTop: -50,
      opacity: 0,
    },
    to: {
      marginTop: showUserIconMenu ? 0 : -50,
      opacity: showUserIconMenu ? 1 : 0,
    },
  });
  return (
    <div>
      <div className="UserIcon" onClick={handleClick}>
        <div className="UserName">{user?.personaname}</div>
        <img
          className="SteamAvatar"
          src={user?.avatarfull}
          alt="Steam Avatar"
        />
      </div>
      <animated.div style={slideInFromTopStyles}>
        {showUserIconMenu && <UserIconMenu />}
      </animated.div>
    </div>
  );
};

export default UserIcon;
