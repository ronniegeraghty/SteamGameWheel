import React, { useState, useEffect } from "react";
import "./Footer.css";
import { fetchVersion } from "../../functions/FetchVersion";

const Footer = () => {
  const [version, setVersion] = useState<string | undefined>(undefined);
  useEffect(() => {
    fetchVersion()?.then((response) => {
      setVersion(response);
    });
  }, []);
  return (
    <div className="Footer">
      <div className="Version">{version ? version : "0.0.0"}</div>
    </div>
  );
};

export default Footer;
