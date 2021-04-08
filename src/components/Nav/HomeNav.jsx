import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Typography from "@material-ui/core/Typography";
import smilelg from "../../images/smilelg.gif";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"©"}
      {new Date().getFullYear()} Smile Up Charitable Foundation is a 501(c)3
      non-profit organization
    </Typography>
  );
}

const HomeNav = ({ userInfo }) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      background: "rgb(0,214,203)",
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
  });
  let location = useLocation();

  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const smileI = (
    <img src={smilelg} alt="SmileUp logo" height="50px" width="80px" />
  );

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          selected={"/" === location.pathname}
          value="Home"
          icon={smileI}
        />
      </BottomNavigation>
      <div className="">
        <Copyright />
      </div>
    </AppBar>
  );
};

export default HomeNav;
