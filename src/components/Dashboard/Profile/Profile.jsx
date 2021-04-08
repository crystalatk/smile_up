import { BrowserRouter as Router, Route } from "react-router-dom";
import VolunteerProfile from "./VolunteerProfile";
import EditVolunteerProfile from "./EditVolunteerProfile";
import AdminProfileView from "./AdminProfileView";

const Profile = ({ userInfo }) => {
  return (
    <>
      <Route path="/profile/myprofile/:id">
        <VolunteerProfile userInfo={userInfo} />
      </Route>
      <Route path="/profile/editprofile/:id">
        <EditVolunteerProfile userInfo={userInfo} />
      </Route>
      <Route path="/profile/adminview/:id">
        <AdminProfileView userInfo={userInfo} />
      </Route>
    </>
  );
};

export default Profile;
