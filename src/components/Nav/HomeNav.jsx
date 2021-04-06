import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import smilelg from "../../images/smilelg.gif";

const HomeNav = ({ userInfo }) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      background: "rgb(0,214,203)",
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
  );
};

export default HomeNav;
