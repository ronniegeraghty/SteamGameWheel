import React from "react";
import styles from "./gameCard.module.css";
import GameInfo from "../../interfaces/GameInfo.interface";

type propsType = {
  game: GameInfo;
};

const GameCard = ({ game }: propsType) => {
  const imageURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`;
  return (
    <div className={styles.GameCard}>
      <img className={styles.GameImage} src={imageURL} alt="Game Image" />
      <span className={styles.GameTitle}>{game.name}</span>
    </div>
  );
};

export default GameCard;
