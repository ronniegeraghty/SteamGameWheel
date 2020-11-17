import React, { useState } from "react";
import "./Header.css";
import {
  Button,
  Input,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

type User = { username: string; password: string };
type HeaderProps = { loginCB: (username: string, password: string) => void };
export const Header = ({ loginCB }: HeaderProps) => {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="HeaderInComp">
      <h1 className="Title">Steam Wheel</h1>
      <form className="LoginForm" noValidate autoComplete="off">
        <FormControl className="UsernameInput">
          <InputLabel htmlFor="standard-adornment-username">
            Steam Username
          </InputLabel>
          <Input
            id="standard-adornment-username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </FormControl>
        <FormControl className="PasswordInput">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          className="LoginButton"
          variant="outlined"
          onClick={() => {
            loginCB(user.username, user.password);
          }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
