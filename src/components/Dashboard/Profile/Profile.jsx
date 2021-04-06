import { BrowserRouter as Router, Route } from "react-router-dom";
import VolunteerProfile from "./VolunteerProfile";
import EditVolunteerProfile from "./EditVolunteerProfile";

const Profile = ({ userInfo }) => {
  return (
    <>
      <Route path="/profile/myprofile/:id">
        <VolunteerProfile userInfo={userInfo} />
      </Route>
      <Route path="/profile/editprofile/:id">
        <EditVolunteerProfile userInfo={userInfo} />
      </Route>
    </>
  );
};

export default Profile;
