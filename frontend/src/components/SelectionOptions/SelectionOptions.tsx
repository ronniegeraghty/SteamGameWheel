import React from "react";
import "./SelectionOptions.css";
const SelectionOptions = () => {
  return (
    <div className="SelectionOptions">
      <form action="" className="OptionsList">
        <div className="UnplayedGames">
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Only Unplayed Games</label>
          </div>
        </div>
        <div className="Genre">
          <label className="TitleLabel">Genre</label>

          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Action</label>
          </div>
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">RPG</label>
          </div>
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Puzzel</label>
          </div>
        </div>
        <div className="Friends">
          <label className="TitleLabel">
            Only Games that these Friends have
          </label>
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Jimmy</label>
          </div>
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Dingus</label>
          </div>
          <div className="Option">
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Fingus</label>
          </div>
        </div>
      </form>
      <button className="ToggleButton">Up</button>
    </div>
  );
};

export default SelectionOptions;
