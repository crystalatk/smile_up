import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import smilelg from "../../images/smilelg.gif";
import bell from "../../images/bell.png";
import profile from "../../images/profile.png";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AddToHomeScreenRoundedIcon from "@material-ui/icons/AddToHomeScreenRounded";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const VolunteerNav = ({ userInfo }) => {
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
  const smileI = <img src={smilelg} height="50px" width="80px" />;
  const bellI = <img src={bell} height="20px" width="20px" />;
  const profileI = <img src={profile} height="20px" width="20px" />;

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        component={Link}
        to="/events"
        selected={"/events" === location.pathname}
        label="Events"
        value="events"
        icon={bellI}
      />
      <BottomNavigationAction
        component={Link}
        to="/dash"
        selected={"/dash" === location.pathname}
        value="Dash"
        icon={smileI}
      />
      <BottomNavigationAction
        component={Link}
        to={`/profile/${userInfo.id}`}
        selected={`/profile/${userInfo.id}` === location.pathname}
        label="Profile"
        value="profile"
        icon={profileI}
      />
    </BottomNavigation>
  );
};
export default VolunteerNav;
