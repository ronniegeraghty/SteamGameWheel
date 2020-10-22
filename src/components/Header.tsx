import React from "react";
import "./Header.css";
import { Button, TextField } from "@material-ui/core";
type HeaderProps = { loginCB: (urnm: string, pswd: string) => void };
export const Header = ({ loginCB }: HeaderProps) => {
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
        <Button
          className="LoginButton"
          variant="outlined"
          onClick={() => {
            loginCB("", "");
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
