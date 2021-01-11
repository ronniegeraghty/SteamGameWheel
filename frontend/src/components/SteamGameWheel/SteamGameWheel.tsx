import React, { createRef, useEffect, useRef, useState } from "react";
import "./SteamGameWheel.css";
import AppState from "../../interfaces/AppState";
import WheelItem from "./WheelItem";
type propsType = {
  appState: AppState;
};
const SteamGameWheel = ({ appState }: propsType) => {
  const gameAmount = appState.userInfo?.games.length;
  const wheelItemRefs = useRef<HTMLSpanElement[]>([]);
  const addToRefs = (ele: HTMLSpanElement) => {
    if (ele && !wheelItemRefs.current.includes(ele)) {
      wheelItemRefs.current.push(ele);
    }
  };
  const [scrollTo, setScrollTo] = useState(0);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          wheelItemRefs.current[Number(scrollTo)].scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <input
          type="text"
          name="scrollTo"
          value={scrollTo}
          onChange={(e) => {
            setScrollTo(Number(e.target.value));
          }}
        />
        <button type="submit">Scroll to</button>
      </form>

      <div className="SteamGameWheel">
        <div className="hideOverflow">
          <div className="Wheel" ref={wheelRef}>
            {appState.userInfo?.games.map((game, i) => {
              return (
                <span ref={addToRefs} key={game.appid}>
                  <WheelItem game={game} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteamGameWheel;
