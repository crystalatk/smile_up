
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewNonMinorAccount from './components/NewNonMinorAccount';
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from './components/TotalVolunteers'
import EventList from "./components/EventList";
import EventDetails from "./components/EventDetails";
import VolunteerHours from "./components/VolunteerHrs";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <LoginVolunteers />
          <AdminLogin />
           <NewNonMinorAccount/>
        </Route>
        <Route path="/addevent" >
          <AddAnEvent />
        </Route>
        <Route path="/totalVolunteers">
          <TotalVolunteers />
        </Route>
        <Route path="/volunteerHours">
            <VolunteerHours />
        <Route />
        <Route path="/addevent">
          <AddAnEvent />
        </Route>
        <Route path="/eventlist">
          <EventList />
        </Route>
        <Route path="/event/:id">
          <EventDetails />
        </Route>
      </Router>
    </div>
  );
}

export default App;
