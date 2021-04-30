import React, { useRef } from "react";
import "./SpinButton.css";
import { useWheel } from "../../hooks/useWheel";

const SpinButton = () => {
  const button = useRef<HTMLButtonElement>(null);
  const { spin, startSpin, stopSpin } = useWheel();
  const spinButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Toggle Spin
    if (spin) stopSpin();
    else startSpin();
    //Remove Focus on button after click
    if (button.current) button.current.blur();
  };
  return (
    <div className="SpinButtonContainer">
      <form onSubmit={spinButton}>
        <button className="SpinButton" ref={button} type="submit">
          {spin ? "Stop" : "Spin"}
        </button>
      </form>
    </div>
  );
};

export default SpinButton;
