import TotalVolunteers from "./TotalVolunteers";
import VolunteerHours from "./VolunteerHrs";
import TotalSmiles from "./TotalSmiles";
import TotalEvents from "./TotalEvents";

const AdminDash = ({ userInfo }) => {
  return (
    <div className="admin-dashboard-container">
      <div className="welcome-message">
        <h1>Welcome, {userInfo.first_name}!</h1>
        <p>The world is wrong, let's right it,</p>
        <p>The battle is hard, let's fight it.</p>
        <p> - Beah Richards</p>
      </div>
      <div className="admin-card-container">
        <div className="admin-inner-card">
          <TotalVolunteers userInfo={userInfo} />
        </div>
        <div className="admin-inner-card">
          <VolunteerHours userInfo={userInfo} />
        </div>
        <div className="admin-inner-card">
          <TotalSmiles />
        </div>
        <div className="admin-inner-card">
          <TotalEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
