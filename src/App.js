import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import NewNonMinorAccount from "./components/NewNonMinorAccount";
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from "./components/TotalVolunteers";
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import VolunteerHours from "./components/VolunteerHrs";
import TotalSmiles from "./components/TotalSmiles";
import "./App.css";
import BottomNav from "./components/BottomNav";

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    id: "",
    isAdmin: false,
    isGuardian: false,
    isMinor: true,
    first_name: "",
  });

  return (
    <div className="App">
      <Router>
      <LoginVolunteers setUserInfo={setUserInfo} />
        <Route exact path="/createaccount">
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
          <EventDetails userInfo={userInfo} />
        </Route>
        <Route path="/totalSmiles">
            <TotalSmiles />
        </Route>
        <BottomNav/>
      </Router>
    </div>
  );
}

export default App;
