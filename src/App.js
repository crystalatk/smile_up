import { BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    id: "",
    is_admin: false,
    is_guardian: false,
    is_minor: false,
    first_name: "",
    age: "",
    avatar_link: "",
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
          <Dashboard
            userInfo={userInfo}
            setEventDetailsForEditPurposes={setEventDetailsForEditPurposes}
            eventDetailsForEditPurposes={eventDetailsForEditPurposes}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
