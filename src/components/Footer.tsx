import React from "react";
import "./Footer.css";
import project from "../../package.json";

export const Footer = () => {
  return (
    <div className="FooterInComp">
      <div className="Author">by Ronnie Geraghty</div>
      <div className="FooterTitle">Steam Wheel</div>
      <div className="Version">v{project.version}</div>
    </div>
  );
};
