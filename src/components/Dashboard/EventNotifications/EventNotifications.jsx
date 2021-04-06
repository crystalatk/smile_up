import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import EventListApproved from "./EventListApproved";
import EventListNeedsApproval from "./EventListNeedsApproval";

const NEEDS_APPROVAL = "Needs Approval";
const APPROVED = "Approved";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const EventNotifications = ({ userInfo }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={NEEDS_APPROVAL} />
          <Tab label={APPROVED} />
        </Tabs>
      </Paper>
      {value ? (
        <EventListApproved userInfo={userInfo} />
      ) : (
        <EventListNeedsApproval userInfo={userInfo} />
      )}
    </>
  );
};

export default EventNotifications;
