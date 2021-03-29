import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
import TotalVolunteers from './components/TotalVolunteers'
import "./App.css";
import VolunteerHours from "./components/VolunteerHrs";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <LoginVolunteers />
          <AdminLogin />
        </Route>
        <Route path="/addevent" >
          <AddAnEvent />
        </Route>
        <Route path="/totalVolunteers">
          <TotalVolunteers />
        </Route>
        <Route path="/volunteerHours">
            <VolunteerHours />
        </Route>
      </Router>
    </div>
  );
}

export default App;
