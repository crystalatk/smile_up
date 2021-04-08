import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import "react-slideshow-image/dist/styles.css";




const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
}));

export default function HomeLogin({ setUserInfo }) {
  const classes = useStyles();

  return (
    <div className="body">

      <Grid container component="main" className={classes.root}>
      </Grid>
  
    </div>
  );
}
