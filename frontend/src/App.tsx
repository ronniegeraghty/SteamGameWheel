import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <div className="App">
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default App;
