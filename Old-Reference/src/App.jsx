import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Master_Detail from "./components/Master_Detail/MasterDetail";
import SampleList from "./components/SampleList/SampleList";
import Blank from "./components/Blank/Blank";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Master_Detail} />
        <Route path="/sample-list" component={SampleList} />
        <Route path="/blank" component={Blank} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

export default App;
