
import './App.css';
import NewNonMinorAccount from './components/NewNonMinorAccount';
import LoginVolunteers from './components__andrew/LoginVolunteers';
import AdminLogin from "./J Component/AdminLogin";

function App() {
  return (
    <div className="App">
      <LoginVolunteers />
      <AdminLogin/>
      <NewNonMinorAccount/>
    </div>
  );
}

export default App;
