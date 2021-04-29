import React, { useEffect } from "react";
// import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import GameWheelCanvas from "./components/GameWheel3D/GameWheelCanvas";
import { useAppState } from "./hooks/useAppState";

const App = () => {
  const { enableDebug, setTestArraySize } = useAppState();
  // useEffect(() => {
  //   enableDebug();
  //   setTestArraySize(10);
  // }, []);
  return (
    <div className="App">
      <Header />
      {/* <Switch>
        <Route exact path="/" component={Blank} />
        </Switch> */}
      <GameWheelCanvas />
      <Footer />
    </div>
  );
};

export default App;
