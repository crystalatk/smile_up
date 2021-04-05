import { useState } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import smilelg from "../images/smilelg.gif";
import bell from "../images/bell.png";
import profile from "../images/profile.png";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import AddToHomeScreenRoundedIcon from '@material-ui/icons/AddToHomeScreenRounded';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AdminNav = () => {
  const useStyles = makeStyles({
    root: {
      width: "100vw",
      background: "rgb(0,214,203)",
    },
  });
    let location = useLocation();
  
    //   useEffect(() => {
    //   console.log(location.pathname);
    // }, []);

  const classes = useStyles();
  const [value, setValue] = useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const smileI = <img src={smilelg} height="50px" width="80px" />;
  const bellI = <img src={bell} height="20px" width="20px" />;
  const profileI = <img src={profile} height="20px" width="20px" />;

  return (
    // <Grid item xs={12}>
    //   <div className="menu-bar">
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction component={Link} to='/adminevents' selected={'/adminevents'=== location.pathname} label="Events" value="events" icon={bellI} />
      <BottomNavigationAction component={Link} to='/admincheckin' selected={'/admincheckin'=== location.pathname} label="Check-in" value="checkin" icon={<AddToHomeScreenRoundedIcon/>} />
      <BottomNavigationAction component={Link} to='/admindash' selected={'/admindash'=== location.pathname} value="Dash" icon={smileI} />
      <BottomNavigationAction component={Link} to='/admindir' selected={'/admindir'=== location.pathname} label="Directory" value="directory" icon={<ImportContactsIcon/>} />
      <BottomNavigationAction component={Link} to='/adminprofile' selected={'/adminprofile'=== location.pathname} label="Profile" value="profile" icon={profileI} />
    </BottomNavigation>
    //   </div>
    // </Grid>
  );
};

export default AdminNav;
