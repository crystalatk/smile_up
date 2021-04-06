import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddToHomeScreenRoundedIcon from "@material-ui/icons/AddToHomeScreenRounded";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";
import smilelg from "../../images/smilelg.gif";

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

const VolunteerNav = ({
  userInfo,
  numberOfApprovalsWaiting,
  setNumberOfApprovalsWaiting,
}) => {
  console.log(numberOfApprovalsWaiting);
  let location = useLocation();
  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const smileI = (
    <img src={smilelg} alt="SmileUp Logo" height="50px" width="80px" />
  );

  useEffect(() => {
    console.log("THIS IS THE VALUE: ", value);
    if (value === "notifications") {
      setNumberOfApprovalsWaiting(0);
    }
  }, [value]);

  useEffect(() => {
    console.log(numberOfApprovalsWaiting);
  }, [numberOfApprovalsWaiting]);

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
          to={`/profile/myprofile/${userInfo.id}`}
          selected={`/profile/myprofile/${userInfo.id}` === location.pathname}
          label="Profile"
          value="profile"
          icon={<AccountCircleIcon />}
        />
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
        <Badge badgeContent={numberOfApprovalsWaiting} color="primary">
          <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
            showLabels
          >
            <BottomNavigationAction
              component={Link}
              to={`/notifications`}
              selected={`/notifications` === location.pathname}
              label="Notifications"
              value="notifications"
              icon={<NotificationsActiveIcon />}
            />
          </BottomNavigation>
        </Badge>
        <BottomNavigationAction
          component={Link}
          to={`/donate`}
          selected={`/donate` === location.pathname}
          label="Donate"
          value="donate"
          icon={<MonetizationOnIcon />}
        />
      </BottomNavigation>
    </AppBar>
  );
};
export default VolunteerNav;
