import React, { useState } from "react";
import { animated, config, useSpring } from "react-spring";
import "./UserIcon.css";
import UserIconMenu from "./UserIconMenu";
import { useUser } from "../../hooks/UseUser";

const UserIcon = () => {
  const { user } = useUser();
  const [showUserIconMenu, setShowUserIconMenau] = useState<boolean>(false);
  const slideInStyles = useSpring({
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
  const slideOutStyles = useSpring({
    config: {
      duration: 100,
      ...config.stiff,
    },
    from: {
      marginTop: 0,
      opacity: 1,
    },
    to: {
      marginTop: showUserIconMenu ? -50 : 0,
      opacity: showUserIconMenu ? 0 : 1,
    },
  });
  const [animationStyle, setAnimationStyle] = useState(slideInStyles);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowUserIconMenau(!showUserIconMenu);
  };
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
      <animated.div style={animationStyle}>
        {showUserIconMenu && <UserIconMenu />}
      </animated.div>
    </div>
  );
};

export default UserIcon;
