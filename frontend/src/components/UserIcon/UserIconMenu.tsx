import React from "react";
import "./UserIconMenu.css";

type propsType = {
  logoffCB: () => void;
};
const UserIconMenu = ({ logoffCB }: propsType) => {
  return (
    <div className="UserIconMenu">
      <ul className="MenuList">
        <li className="Logoff" onClick={logoffCB}>
          Logoff
        </li>
        <li>About</li>
      </ul>
    </div>
  );
};

export default UserIconMenu;
