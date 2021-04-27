import React from "react";
// import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import GameWheelCanvas from "./components/GameWheel3D/GameWheelCanvas";
import { UserProvider } from "./hooks/UseUser";

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        {/* <Switch>
          <Route exact path="/" component={Blank} />
        </Switch> */}
        <GameWheelCanvas />
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
