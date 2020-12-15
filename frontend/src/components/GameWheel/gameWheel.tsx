import React from "react";
import GameInfo from "../../interfaces/GameInfo.interface";
import GameCard from "../GameCard/gameCard";
import styles from "./gameWheel.module.css";
type propsType = {
  games: GameInfo[];
};
const GameWheel = ({ games }: propsType) => {
  return (
    <div className={styles.GameWheel}>
      <GameCard game={games[0]} />
      <GameCard game={games[1]} />
      <GameCard game={games[2]} />
    </div>
  );
};

export default GameWheel;
