import React from "react";
import "./UserIconMenu.css";
import { useUser } from "../../hooks/UseUser";

const UserIconMenu = () => {
  const { logoff } = useUser();
  return (
    <div className="UserIconMenu">
      <ul className="MenuList">
        <li className="Logoff" onClick={logoff}>
          Logoff
        </li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default UserIconMenu;
