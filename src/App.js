import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import NewNonMinorAccount from "./components/NewNonMinorAccount";
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from "./components/TotalVolunteers";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import VolunteerHours from "./components/VolunteerHrs";
import EditEvent from "./components/EditEvent";
import VolunteerDirectory from "./components/VolunteerDirectory";
import VolunteerProfile from "./components/VolunteerProfile";
import TotalSmiles from "./components/TotalSmiles";
import TotalEvents from "./components/TotalEvents";
import VolunteerHrsById from "./components/VolunteerHrsById";
import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    id: "",
    isAdmin: false,
    isGuardian: false,
    isMinor: true,
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
        <Route exact path="/login">
          <LoginVolunteers setUserInfo={setUserInfo} />
          <AdminLogin />
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
        <Route path="/addevent">
          <AddAnEvent userInfo={userInfo} />
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
            <VolunteerHrsById />
        </Route>
      </Router>
    </div>
  );
}

export default App;
