import React from "react";
import "./SpinButton.css";
import { useUser } from "../../hooks/UseUser";
import { useWheel } from "../../hooks/useWheel";

const SpinButton = () => {
  const { userFound } = useUser();
  const { spin, startSpin, stopSpin } = useWheel();
  const loginButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (spin) stopSpin();
    else startSpin();
  };
  return (
    <div className="SpinButton">
      <form
        className={
          !(userFound === false) ? "LoginForm" : "LoginFormUserNotFound"
        }
        onSubmit={loginButton}
      >
        <button className="LoginButton" type="submit">
          {spin ? "Stop" : "Spin"}
        </button>
      </form>
      {userFound === false && (
        <span className="NoUserFoundText">Steam User Not Found!</span>
      )}
    </div>
  );
};

export default SpinButton;
