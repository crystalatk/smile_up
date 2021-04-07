import { useEffect } from "react";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import Badge from "@material-ui/core/Badge";

const NotificationIcon = ({
  numberOfApprovalsWaiting,
  setNumberOfApprovalsWaiting,
}) => {
  useEffect(() => {
    setNumberOfApprovalsWaiting(0);
  }, []);

  return (
    <Badge badgeContent={numberOfApprovalsWaiting} color="primary">
      <NotificationsActiveIcon />
    </Badge>
  );
};

export default NotificationIcon;
