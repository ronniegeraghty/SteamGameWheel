import React from "react";
import "./Header.css";
import { Button, TextField } from "@material-ui/core";

export const Header = () => {
  return (
    <div className="HeaderInComp">
      <h1 className="Title">Steam Wheel</h1>
      <form className="LoginForm" noValidate autoComplete="off">
        <TextField
          className="UsernameInput"
          id="standard-basic"
          label="Steam Username"
        />
        <TextField
          className="PasswordInput"
          id="standard-basic"
          label="Password"
        />
        <Button className="LoginButton" variant="outlined">
          Login
        </Button>
      </form>
    </div>
  );
};
