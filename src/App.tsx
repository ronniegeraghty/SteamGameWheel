import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { SpinWheel } from "./components/SpinWheel";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>
      <div className="SpinWheel">
        <SpinWheel />
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
