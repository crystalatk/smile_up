import { Route } from "react-router-dom";
import GuardianDash from "./Home/GuardianDash";
import AdminDash from "./Home/AdminDash";
import AdminDir from "./Directory/AdminDir";
import Events from "./Events/Events";
import Profile from "./Profile/Profile";
import EventNotifications from "./EventNotifications/EventNotifications";
import Donate from "./Donate/Donate";
import AddEventOrDoc from "./Documents/AddEventOrDoc";
import OurMission from "./Home/OurMission";
import LoginVolunteers from "../Header/LoginVolunteers";
import NewNonMinorAccount from "../Header/NewNonMinorAccount";
import NewMinorAccount from "../Header/NewMinorAccount";
import FriendsList from "./Friends/FriendsList";

const Dashboard = ({
  userInfo,
  setUserInfo,
  setEventDetailsForEditPurposes,
  eventDetailsForEditPurposes,
}) => {
  return (
    <>
      {!userInfo.isLoggedIn && (
        <>
          <Route exact path="/">
            <LoginVolunteers setUserInfo={setUserInfo} />
            <OurMission />
          </Route>
          <Route path="/createaccount">
            <NewNonMinorAccount />
          </Route>
          <Route path="/newminor/:guardianid">
            <NewMinorAccount />
          </Route>
        </>
      )}
      {userInfo.is_guardian && (
        <Route exact path="/">
          <GuardianDash userInfo={userInfo} />
        </Route>
      )}
      {userInfo.is_minor && (
        <Route exact path="/">
          <GuardianDash userInfo={userInfo} />
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
        <AddEventOrDoc userInfo={userInfo} />
      </Route>
      <Route path="/notifications/:index">
        <EventNotifications userInfo={userInfo} />
      </Route>
      <Route path="/donate">
        <Donate />
      </Route>
      <Route path="/friends">
        <FriendsList userInfo={userInfo} />
      </Route>
    </>
  );
};

export default Dashboard;
