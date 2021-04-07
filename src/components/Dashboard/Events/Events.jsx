import { useState } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import EditEvent from "./EditEvent";
import GuardianSignUp from "./GuardianSignUp";
import MinorSignUp from "./MinorSignUp";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";

const UPCOMING = "Upcoming Events";
const PAST = "Past Events";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Events = ({
  userInfo,
  setEventDetailsForEditPurposes,
  eventDetailsForEditPurposes,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Route exact path="/events">
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label={UPCOMING} />
            <Tab label={PAST} />
          </Tabs>
        </Paper>
        {value ? (
          <EventList userInfo={userInfo} />
        ) : (
          <EventList userInfo={userInfo} />
        )}
      </Route>
      <Route exact path="/events/editevent">
        <EditEvent eventDetailsForEditPurposes={eventDetailsForEditPurposes} />
      </Route>
      <Route path="/events/guardiansignup/:event_id">
        <GuardianSignUp
          userInfo={userInfo}
          eventDetailsForEditPurposes={eventDetailsForEditPurposes}
        />
      </Route>
      <Route path="/events/minorsignup/:event_id">
        {!!userInfo.isLoggedIn ? (
          <MinorSignUp
            userInfo={userInfo}
            eventDetailsForEditPurposes={eventDetailsForEditPurposes}
          />
        ) : null}
      </Route>
      <Route path="/events/eventdetails/:id">
        <EventDetails
          userInfo={userInfo}
          setEventDetailsForEditPurposes={setEventDetailsForEditPurposes}
        />
      </Route>
      <Route path="/events/checkin/:va_id">
        <CheckIn userInfo={userInfo} />
      </Route>
      <Route path="/events/checkout/:va_id">
        <CheckOut userInfo={userInfo} />
      </Route>
    </>
  );
};
export default Events;
