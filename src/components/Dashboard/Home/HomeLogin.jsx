import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import smile2 from "../../../images/smile2.jfif";
import s4 from "../../../images/s4.jpg";
import s5 from "../../../images/s5.jpg";
import s6 from "../../../images/s6.jpg";
import s7 from "../../../images/s7.jpg";
import s8 from "../../../images/s8.jpg";
import s9 from "../../../images/s9.jpg";
import s10 from "../../../images/s10.jpg"
import { useEffect } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"©"}
      2020 Smile Up Charitable Foundation is a 501(c)3 non-profit organization
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const images = [s4, s5, s6, s7, s8, s9, s10];

const zoomOutProperties = {
  duration: 1000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 1,
  arrows: true,
};
const Slideshow = () => {
  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {images.map((each, index) => (
          <img
            key={index}
            style={{ width: "100%", height: "60%" }}
            src={each}
            alt="Images of Volunteers at Events"
          />
        ))}
      </Zoom>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  
   
  },
  image: {
    maxHeight: "100vh", 
    width: "100vw",
    overflow: "hidden",
    backgroundPosition: "center",
  },
  image2: {
    maxHeight: "100%",
    borderRadius: "16",
    borderWidth: "5",
    overflow: "hidden",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 9, 5, 9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "70%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "red",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function HomeLogin() {
  const classes = useStyles();
  useEffect(()=> {
    document.body.classList.add('loginBackground')
  },[])

  return (
    <div className="body">
      <Grid >
        <h1>Welcome to the SmileUp! Charitable Foundation!</h1>
        <Grid item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                style={{
                  borderColor: "rgb(248,135,21)",
                  borderWidth: "5px",
                  borderStyle: "solid",
                  color: "white",
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
                // color="secondary"
              />
              <TextField
                style={{
                  borderColor: "rgb(0,214,203)",
                  borderWidth: "5px",
                  borderStyle: "solid",
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item></Grid>
              </Grid>
              <Box mt={5}>
                <Copyright Text="2020 Smile Up Charitable Foundation is a 501(c)3 non-profit organization" />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <Box
        style={{
          marginTop: "20px",
          paddingTop: "70px",
          fontFamily: "sans-serif",
          borderBottomStyle: "solid",
          borderBottomWidth: "15px",
        }}
      >
        <h1>
          SmileUp! is a 501c3 non-profit whose mission is to get kids helping
          kids through volunteerism. <br /> Our focus is on recruiting
          volunteers from all walks of life, in order to present <br /> a
          diverse group of SERVICE LEADERS who know how to work for and along
          side those <br /> who look and live differently than they do. Children
          instinctively focus on the humanity <br /> of a person and SmileUp!
          reinforces this character trait so that they carry it into adulthood.{" "}
          <br /> The young volunteers learn empathy, compassion and tolerance
          through their volunteer service, and by <br /> supporting SmileUp!,
          you are supporting our young volunteers in their efforts to make their
          communities <br /> and this world a better place for all.
        </h1>
      </Box>
      <h2 className="home1">OUR VISION</h2>
      <Box
        style={{
          paddingTop: "1px",
        }}
      >
        <h2>
          We envision a world where young people are leading the charge in
          volunteerism through awareness, advocacy and action. Our mission is to
          be a conduit through which they can accomplish this.
        </h2>
      </Box>
      <Box
        style={{
          backgroundColor: "rgb(0, 214, 203)",
          fontFamily: "sans-serif",
          borderTopStyle: "solid",
          borderTopWidth: "15px",
        }}
      >
        <h1 className="home1">WHAT WE BELIEVE</h1>
        <h2 style={{ backgroundColor: " rgb(0, 214, 203)" }}>
          Every child has an innate desire to help others <br /> Every child
          should be shown respect and treated with dignity <br />
          Every child has a voice that should be heard <br />
          Every child should have something to smile about <br />
          Every child has a purpose and has something to offer to the world
        </h2>
      </Box>
      <Box
        style={{
          width: "40%",
          height: "40%",
          minHeight: "50%",
          position: "relative",
          margin: "auto",
        }}
      >
        <Slideshow />
      </Box>
    </div>
  );
}
