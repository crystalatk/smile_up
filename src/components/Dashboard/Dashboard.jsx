import { Route } from "react-router-dom";
import HomeLogin from "./Home/HomeLogin";
import VolunteerDash from "./Home/VolunteerDash";
import GuardianDash from "./Home/GuardianDash";
import AdminDash from "./Home/AdminDash";
import AdminDir from "./Directory/AdminDir";
import Events from "./Events/Events";
import Profile from "./Profile/Profile";
import AddAnEvent from "./Events/AddAnEvent";
import EventNotifications from "./EventNotifications/EventNotifications";
import Donate from "./Donate/Donate";


const Dashboard = ({
  userInfo,
  setEventDetailsForEditPurposes,
  eventDetailsForEditPurposes,
}) => {
  return (
    <>
      {!userInfo.isLoggedIn && (
        <Route exact path="/">
          <HomeLogin />
        </Route>
      )}
      {userInfo.is_guardian && (
        <Route exact path="/">
          <GuardianDash userInfo={userInfo} />
        </Route>
      )}
      {userInfo.is_minor && (
        <Route exact path="/">
          <VolunteerDash userInfo={userInfo} />
        </Route>
      )}
      {userInfo.is_admin && (
        <Route exact path="/">
          <AdminDash userInfo={userInfo} />
        </Route>
      )}
      <Route exact path="/admindir">
        <AdminDir userInfo={userInfo} />
      </Route>
      <Route path="/events">
        <Events
          userInfo={userInfo}
          setEventDetailsForEditPurposes={setEventDetailsForEditPurposes}
          eventDetailsForEditPurposes={eventDetailsForEditPurposes}
        />
      </Route>
      <Route path="/profile">
        <Profile userInfo={userInfo} />
      </Route>

      <Route path="/addevent">
        <AddAnEvent userInfo={userInfo} />
      </Route>
      <Route path="/notifications/:index">
        <EventNotifications userInfo={userInfo} />
      </Route>
      <Route path="/donate">
        <Donate />
      </Route>
    </>
  );
};

export default Dashboard;
