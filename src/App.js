import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
import EventList from "./components/EventList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/login">
          <LoginVolunteers />
          <AdminLogin />
        </Route>
        <Route path="/addevent">
          <AddAnEvent />
        </Route>
        <Route path="/eventlist">
          <EventList />
        </Route>
      </Router>
    </div>
  );
}

export default App;
