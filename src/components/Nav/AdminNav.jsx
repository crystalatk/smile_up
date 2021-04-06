import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import AddToHomeScreenRoundedIcon from "@material-ui/icons/AddToHomeScreenRounded";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import smilelg from "../../images/smilelg.gif";

const AdminNav = ({ userInfo }) => {
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
    <img src={smilelg} alt="SmileUp Logo" height="50px" width="80px" />
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
        to="/addevent"
        selected={location.pathname === "/addevent"}
        label="Add Event"
        value="addEvent"
        icon={<AddToPhotosIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/events"
        selected={location.pathname === "/events"}
        label="Events"
        value="events"
        icon={<AddToHomeScreenRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/admindash"
        selected={location.pathname === "/admindash"}
        value="Dash"
        icon={smileI}
      />
      <BottomNavigationAction
        component={Link}
        to="/admindir"
        selected={location.pathname === "/admindir"}
        label="Directory"
        value="directory"
        icon={<ImportContactsIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/profile/myprofile/${userInfo.id}`}
        selected={location.pathname === `/profile/myprofile/${userInfo.id}`}
        label="Profile"
        value="profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
};

export default AdminNav;
