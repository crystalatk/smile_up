import { useState } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Fab from '@material-ui/core/Fab';




const LoginVolunteers = () => {
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = await fetch("http://127.0.0.1:3232/login/sitelogin", {
      method: "Get",
      headers: { "Content-Type": "application/json" },
      Body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => response.json());
    console.log("Here are the search results: ", loginData);
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
