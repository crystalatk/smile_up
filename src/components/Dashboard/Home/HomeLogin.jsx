import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
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
import s10 from "../../../images/s10.jpg";


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
      {/* <Box
        style={{
          marginTop: "20px",
          paddingTop: "70px",
          backgroundColor: "white",
          fontFamily: "sans-serif",
          borderBottomStyle: "solid",
          borderBottomWidth: "15px",
        }}
      > */}
        {/* <h1>
          
        </h1> */}
      {/* </Box> */}
      {/* <h2 className="home1">OUR VISION</h2> */}
      {/* <Box
        style={{
          backgroundColor: " rgb(0, 214, 203)",
          paddingTop: "1px",
        }}
      >
        <h2>
          
        </h2>
      </Box> */}
      {/* <Box
        style={{
          backgroundColor: "rgb(0, 214, 203)",
          fontFamily: "sans-serif",
          borderTopStyle: "solid",
          borderTopWidth: "15px",
        }}
      > */}
        {/* <h1 className="home1">WHAT WE BELIEVE</h1> */}
        {/* <h2 style={{ backgroundColor: " rgb(0, 214, 203)" }}>
          Every child has an innate desire to help others <br /> Every child
          should be shown respect and treated with dignity <br />
          Every child has a voice that should be heard <br />
          Every child should have something to smile about <br />
          Every child has a purpose and has something to offer to the world
        </h2> */}
      {/* </Box> */}
      {/* <Box
        style={{
          width: "40%",
          height: "40%",
          minHeight: "50%",
          position: "relative",
          margin: "auto",
        }}
      > */}
        {/* <Slideshow /> */}
      {/* </Box> */}
    </div>
  );
}
