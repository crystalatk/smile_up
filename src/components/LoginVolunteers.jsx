import { useState } from "react";
import React from "react";
import BottomNav from "./BottomNav";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";

const LoginVolunteers = ({ setUserInfo }) => {
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await fetch("http://127.0.0.1:3232/login/sitelogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());
    console.log("Here are the login results: ", loginData);
    setUserInfo({
      isLoggedIn: true,
      id: loginData.id,
      is_admin: loginData.is_admin,
      is_guardian: loginData.is_guardian,
      is_minor: loginData.is_minor,
      first_name: loginData.first_name,
    });
  };

  const _onUserName = (e) => {
    setUserName(e.target.value);
  };

  const _onPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={_handleSubmit}>
        <label>
          <TextField
            required
            name="name"
            id="outlined-required"
            label="Username"
            variant="outlined"
            margin="dense"
            type="text"
            onChange={_onUserName}
          />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            margin="dense"
            onChange={_onPassword}
            required
          />
        </label>
        <Fab type="submit">Submit</Fab>
      </form>
    </div>
  );
};

export default LoginVolunteers;
