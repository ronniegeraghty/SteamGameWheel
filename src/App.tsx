import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { SpinWheel } from "./components/SpinWheel";
import { Footer } from "./components/Footer";
import { Login } from "./functions/SteamLogin";
import { State } from "./types/State";
function App() {
  const [state, setstate] = useState<State>({});
  const loginCB = (username: string, password: string): void =>
    setstate(Login(username, password));
  return (
    <div className="App">
      <div className="Header">
        <Header loginCB={loginCB} />
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
