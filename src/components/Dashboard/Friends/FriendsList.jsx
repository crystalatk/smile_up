import { useState } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CurrentFriends from "../Friends/CurrentFriends";

const FRIENDS = "My Friends";
const FIND = "Find Friends";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const FriendsList = ({ userInfo }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {userInfo.isLoggedIn ? (
        <Route exact path="/friends">
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label={FRIENDS} />
              <Tab label={FIND} />
            </Tabs>
          </Paper>
          {value ? null : <CurrentFriends userInfo={userInfo} />}
        </Route>
      ) : (
        <h1>Login to see your friends!</h1>
      )}
    </>
  );
};

export default FriendsList;
