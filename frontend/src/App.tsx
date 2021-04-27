import React, { useState } from "react";
// import { Switch, Route } from "react-router-dom";
import "./App.css";
import AppState, { InitAppState } from "./interfaces/AppState";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { fetchUserInfo } from "./functions/FetchUserInfo";
import { shuffle } from "./functions/ShuffleArray";
import SteamGameWheel from "./components/SteamGameWheel/SteamGameWheel";
import GameWheelCanvas from "./components/GameWheel3D/GameWheelCanvas";
import { UserProvider, useUser } from "./hooks/UseUser";

const App = () => {
  const { user } = useUser();
  return (
    <div className="App">
      <UserProvider>
        <Header />
        {/* <Switch>
          <Route exact path="/" component={Blank} />
        </Switch> */}
        {/* {user && <SteamGameWheel />} */}
        <GameWheelCanvas />
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
