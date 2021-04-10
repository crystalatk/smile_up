import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  image: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "contain",
    maxHeight: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundPosition: "center",
    
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgb(255,255,255,0.7)",
    width: '350px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%",
    marginTop: theme.spacing(1),
    color: "red",
  },
}));

const LoginVolunteers = ({ setUserInfo }) => {
  useEffect(() => {
    document.body.classList.add('bgBody')
    console.log('UseEffect Ran')
  })
  const classes = useStyles();

  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [wrongPasswordUsername, setWrongPasswordUsername] = useState(false);
  const [wrongUsername, setWrongUsername] = useState(false);

  const _handleSubmit = async (e) => {
   
    e.preventDefault();
    const loginData = await fetch(`${process.env.REACT_APP_HOST}/login/sitelogin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .catch((e) => {
        console.log(e);
        setWrongUsername(true);
      });
    console.log("Here are the login results: ", loginData);
    if (loginData && !loginData.isValid) {
      setUserInfo({ isLoggedIn: false });
      setWrongPasswordUsername(true);
      setWrongUsername(false);
    }

    if (loginData?.id) {
      setUserInfo({
        isLoggedIn: true,
        id: loginData.id,
        is_admin: loginData.is_admin,
        is_guardian: loginData.is_guardian,
        is_minor: loginData.is_minor,
        first_name: loginData.first_name,
        age: loginData.age.years,
        avatar_link: loginData.avatar_link,
      });
      setWrongPasswordUsername(false);
      setWrongUsername(false);
    }
  };

  const _onUserName = (e) => {
    setUserName(e.target.value);
  };

  const _onPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1 className="banner">Welcome to the SmileUp! Charitable Foundation!</h1>
      
      <div className="signin">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={_handleSubmit} noValidate>
            <TextField
              style={{
                borderColor: "rgb(248,135,21)",
                borderWidth: "5px",
                borderStyle: "solid",
                color: "white",
                display: "flex",
                maxWidth: "300px",
                minWidth: "200px",
                flexDirection: "column",
                margin: "auto",
                position: "relative",
                bottomPadding: "38em",
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={_onUserName}
            />
            <TextField
              style={{
                borderColor: "rgb(0,214,203)",
                borderWidth: "5px",
                borderStyle: "solid",
                maxWidth: "300px",
                minWidth: "200px",
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                position: "relative",
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={_onPassword}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {wrongPasswordUsername ? (
              <h6
                className={
                  !!wrongPasswordUsername
                    ? "f-red f-small m-0"
                    : "f-disappear f-small m-0"
                }
              >
                Your password and username do not match.
              </h6>
            ) : (
              <h6
                className={
                  !!wrongUsername
                    ? "f-red f-small m-0"
                    : "f-disappear f-small m-0"
                }
              >
                Your username does not exist.
              </h6>
            )}
            <h6>
              <Link to="/createaccount">
                Need to create an account? Click here
              </Link>
            </h6>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginVolunteers;
