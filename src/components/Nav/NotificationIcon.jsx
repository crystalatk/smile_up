import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles({
  badge: {},
});

const NotificationIcon = ({
  numberOfApprovalsWaiting,
  setNumberOfApprovalsWaiting,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNumberOfApprovalsWaiting(0);
  }, []);

  return (
    <Badge
      badgeContent={numberOfApprovalsWaiting}
      color="primary"
      className={classes.badge}
    >
      <NotificationsActiveIcon />
    </Badge>
  );
};

export default NotificationIcon;
