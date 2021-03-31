import { Link } from "react-router-dom";

const TempHeader = () => {
  return (
    <>
      <h1>These are development nav tools to be deleted</h1>
      <Link to="/directory">Directory</Link>
      <Link to="/createaccount">Create Account</Link>
      <Link to="/volunteerHoursId">Volunteer Hours Id</Link>
      <Link to="/editprofile/26">CrystalEditProfile </Link>
      <Link to="/profile/26"> Crystal's'Profile</Link>
      <Link to="/profile/40"> Ella's'Profile</Link>
    </>
  );
};

export default TempHeader;
