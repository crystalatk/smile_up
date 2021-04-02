import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NewNonMinorAccount from "./components/NewNonMinorAccount";
import LoginVolunteers from "./components/LoginVolunteers";
import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from "./components/TotalVolunteers";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import VolunteerHours from "./components/VolunteerHrs";
import EditEvent from "./components/EditEvent";
import VolunteerDirectory from "./components/VolunteerDirectory";
import VolunteerProfile from "./components/VolunteerProfile";
import TotalSmiles from "./components/TotalSmiles";
import TempHeader from "./components/TempHeader";
import TotalEvents from "./components/TotalEvents";
import TotalEventsId from "./components/TotalEventsId";
import VolunteerHrsById from "./components/VolunteerHrsById";
import LogoutButton from "./components/LogoutButton";
import EditVolunteerProfile from "./components/EditVolunteerProfile";
import "./App.css";
import BottomNav from "./components/BottomNav";
import NewMinorAccount from "./components/NewMinorAccount";
import GuardianSignUp from "./components/GuardianSignUp";
import MinorSignUp from './components/MinorSignUp';
import CheckIn from "./components/CheckIn";


function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    id: "",
    is_admin: false,
    is_guardian: false,
    is_minor: true,
    first_name: "",
  });
  const [
    eventDetailsForEditPurposes,
    setEventDetailsForEditPurposes,
  ] = useState({
    adults_needed: false,
    age_min: "",
    alerts: "",
    date_start: "",
    date_stop: "",
    description: "",
    headcount_served_potential: "",
    id: "",
    location: "",
    max_particcipants: "",
    min_participants: "",
    num_adults: "",
    signup_deadline: "",
    title: "",
  });

  // useEffect for console logs
  useEffect(() => {
    console.log(
      "THESE ARE THE EVENT DETAILS FOR EDIT PURPOSE: ",
      eventDetailsForEditPurposes
    );
  }, [eventDetailsForEditPurposes]);

  return (
    <div className="App">
      <Router>
        <TempHeader />
        {!!userInfo.isLoggedIn ? (
          <LogoutButton setUserInfo={setUserInfo} />
        ) : (
          <LoginVolunteers setUserInfo={setUserInfo} />
        )}

        <Route path="/createaccount">
          <NewNonMinorAccount />
        </Route>
        <Route path="/addevent">
          <AddAnEvent userInfo={userInfo} />
        </Route>
        <Route path="/totalVolunteers">
          <TotalVolunteers userInfo={userInfo} />
        </Route>
        <Route path="/volunteerHours">
          <VolunteerHours userInfo={userInfo} />
        </Route>
        <Route path="/eventlist">
          <EventList userInfo={userInfo} />
        </Route>
        <Route path="/event/:id">
          <EventDetails
            userInfo={userInfo}
            setEventDetailsForEditPurposes={setEventDetailsForEditPurposes}
          />
        </Route>
        <Route exact path="/editevent">
          <EditEvent
            eventDetailsForEditPurposes={eventDetailsForEditPurposes}
          />
        </Route>
        <Route path="/directory">
          <VolunteerDirectory userInfo={userInfo} />
        </Route>
        <Route path="/profile/:id">
          <VolunteerProfile userInfo={userInfo} />
        </Route>
        <Route path="/totalSmiles">
          <TotalSmiles />
        </Route>
        <Route path="/counttotalevents">
          <TotalEvents />
        </Route>
        <Route path="/volunteerHoursId">
          <VolunteerHrsById id={userInfo.id} />
        </Route>
        <Route path="/totalEventsId">
          <TotalEventsId id={userInfo.id} />
        </Route>
        <Route path="/editprofile/:id">
          <EditVolunteerProfile userInfo={userInfo} />
        </Route>
        <Route path="/newminor/:guardianid">
          <NewMinorAccount />
        </Route>
        <Route path="/guardiansignup/:event_id">
          <GuardianSignUp userInfo={userInfo} />
        </Route>
        <Route path="/checkin/:va_id">
        <Route path="/minorsignup">
            <MinorSignUp userInfo={userInfo}/>
        </Route>
        <Route path="/checkin/:event_id/:volunteer_id">
          <CheckIn userInfo={userInfo} />
        </Route>

        <BottomNav />
      </Router>
    </div>
  );
}

export default App;
