import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddToHomeScreenRoundedIcon from "@material-ui/icons/AddToHomeScreenRounded";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import smilelg from "../../images/smilelg.gif";

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
        to="/events"
        selected={"/events" === location.pathname}
        label="Events"
        value="events"
        icon={<AddToHomeScreenRoundedIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/"
        selected={"/" === location.pathname}
        value="Dash"
        icon={smileI}
      />
      <BottomNavigationAction
        component={Link}
        to={`/notifications`}
        selected={`/notifications` === location.pathname}
        label="Approval"
        value="approval"
        icon={<NotificationsActiveIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to={`/profile/myprofile/${userInfo.id}`}
        selected={`/profile/myprofile/${userInfo.id}` === location.pathname}
        label="Profile"
        value="profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
};
export default VolunteerNav;
