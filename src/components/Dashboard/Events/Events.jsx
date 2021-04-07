import { Route } from "react-router-dom";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import EditEvent from "./EditEvent";
import GuardianSignUp from "./GuardianSignUp";
import MinorSignUp from "./MinorSignUp";
import CheckIn from "./CheckIn";
import CheckOut from "./CheckOut";

const Events = ({
  userInfo,
  setEventDetailsForEditPurposes,
  eventDetailsForEditPurposes,
}) => {
  return (
    <>
      <Route exact path="/events">
        <EventList />
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
