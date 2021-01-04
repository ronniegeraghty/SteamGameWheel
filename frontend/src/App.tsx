import React, { useState } from "react";
// import { Switch, Route } from "react-router-dom";
import "./App.css";
import AppState, { InitAppState } from "./interfaces/AppState";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { fetchUserInfo } from "./functions/FetchUserInfo";

const App = () => {
  const [appState, setAppState] = useState<AppState>(InitAppState);
  const setUserInfo = (submitedUserName: string) => {
    console.log(submitedUserName);
    fetchUserInfo(submitedUserName)?.then((userInfo) => {
      setAppState({ userInfo: userInfo });
    });
  };
  return (
    <div className="App">
      <React.Fragment>
        <Header appState={appState} setUserInfoCB={setUserInfo} />
        {/* <Switch>
          <Route exact path="/" component={Blank} />
        </Switch> */}
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default App;
