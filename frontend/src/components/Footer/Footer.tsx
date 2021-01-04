import React, { useState, useEffect } from "react";
import "./Footer.css";
import { fetchVersion } from "../../functions/FetchVersion";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const [version, setVersion] = useState<string | undefined>(undefined);
  useEffect(() => {
    fetchVersion()?.then((response) => {
      setVersion(response);
    });
  }, []);
  return (
    <div className="Footer">
      <div className="Version">v {version ? version : "0.0.0"}</div>
      <div className="Author">by Ronnie Geraghty</div>
      <div className="Github">
        <a
          className="GithubLink"
          href="https://github.com/ronniegeraghty/SteamGameWheel"
        >
          <div className="GithubIcon">
            <FaGithub />
          </div>
          GitHub
        </a>
      </div>
    </div>
  );
};

export default Footer;
