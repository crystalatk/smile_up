import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginVolunteers from "./components/LoginVolunteers";
import AdminLogin from "./components/AdminLogin";
import AddAnEvent from "./components/AddAnEvent";
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
      </Router>
    </div>
  );
}

export default App;
