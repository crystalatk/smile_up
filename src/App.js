import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from "./components/TotalVolunteers";
import EventList from "./components/EventList";
import EventListApproved from "./components/EventListApproved";
import EventListNeedsApproval from "./components/EventListNeedsApproval";
import EventDetails from "./components/EventDetails";
import VolunteerHours from "./components/VolunteerHrs";
import EditEvent from "./components/EditEvent";
import VolunteerDirectory from "./components/VolunteerDirectory";
import VolunteerProfile from "./components/VolunteerProfile";
import TotalSmiles from "./components/TotalSmiles";

import TotalEvents from "./components/TotalEvents";
import TotalEventsId from "./components/TotalEventsId";
import VolunteerHrsById from "./components/VolunteerHrsById";

import EditVolunteerProfile from "./components/EditVolunteerProfile";
import "./App.css";

import NewMinorAccount from "./components/NewMinorAccount";
import GuardianSignUp from "./components/GuardianSignUp";
import MinorSignUp from "./components/MinorSignUp";
import CheckIn from "./components/CheckIn";
import CheckOut from "./components/CheckOut";
import AdminDash from "./components/AdminDash";
import AdminDir from "./components/AdminDir";
import AdminProfile from "./components/AdminProfile";
import AdminEvents from "./components/AdminEvents";
import AdminCheckin from "./components/AdminCheckin";
import HomeLogin from "./components/HomeLogin";
import VolunteerDash from "./components/VolunteerDash";
import GuardianDash from "./components/GuardianDash";

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    id: "",
    is_admin: false,
    is_guardian: false,
    is_minor: false,
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
        <Header setUserInfo={setUserInfo} userInfo={userInfo} />
        <Nav userInfo={userInfo} />

        <div className="body">
          <Route exact path="/">
            <HomeLogin />
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
          <Route path="/eventlistapproved">
            <EventListApproved userInfo={userInfo} />
          </Route>
          <Route path="/eventlistneedsapproval">
            <EventListNeedsApproval userInfo={userInfo} />
          </Route>
          <Route path="/vd">
            <VolunteerDash userInfo={userInfo} />
          </Route>
          <Route path="/gd">
            <GuardianDash userInfo={userInfo} />
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
          <Route exact path="/admindash">
            <AdminDash userInfo={userInfo} />
          </Route>
          <Route exact path="/admincheckin">
            <AdminCheckin userInfo={userInfo} />
          </Route>
          <Route exact path="/adminevents">
            <AdminEvents userInfo={userInfo} />
          </Route>
          <Route path="/adminprofile/:id">
            <AdminProfile userInfo={userInfo} />
          </Route>
          <Route exact path="/admindir">
            <AdminDir userInfo={userInfo} />
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
          <Route path="/minorsignup/:event_id">
            {!!userInfo.isLoggedIn ? <MinorSignUp userInfo={userInfo} /> : null}
          </Route>
          <Route path="/checkin/:va_id">
            <CheckIn userInfo={userInfo} />
          </Route>
          <Route path="/checkout/:va_id">
            <CheckOut userInfo={userInfo} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
