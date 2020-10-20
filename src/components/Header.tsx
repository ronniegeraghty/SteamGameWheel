import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <div className="HeaderInComp">
      <div className="InputSection">
        <input className="UserNameTextInput" type="text"></input>
        <button>Search</button>
      </div>
    </div>
  );
};
