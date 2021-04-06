import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import smilelg from "../images/smilelg.gif";
import bell from "../images/bell.png";
import mail from "../images/mail.png";
import donate from "../images/donate.png";
import profile from "../images/profile.png";

const BottomNav = () => {
  const useStyles = makeStyles({
    root: {
      width: "100vw",
      background: "rgb(0,214,203)",
    },
  });

  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const smileI = <img src={smilelg} height="50px" width="80px" />;
  const bellI = <img src={bell} height="20px" width="20px" />;
  const mailI = <img src={mail} height="20px" width="20px" />;
  const donateI = <img src={donate} height="20px" width="20px" />;
  const profileI = <img src={profile} height="20px" width="20px" />;

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction label="Profile" value="profile" icon={profileI} />
      <BottomNavigationAction label="Messages" value="messages" icon={mailI} />
      <BottomNavigationAction value="home" icon={smileI} />
      <BottomNavigationAction label="Events" value="events" icon={bellI} />
      <BottomNavigationAction label="Donate" value="donate" icon={donateI} />
    </BottomNavigation>
  );
};

export default BottomNav;
