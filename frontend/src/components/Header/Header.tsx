import React from "react";
import Login from "../Login/Login";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h1 className="brand">STEAM GAME WHEEL</h1>
      <Login />
    </div>
  );
};

export default Header;
