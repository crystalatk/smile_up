import AdminNav from "./AdminNav";
import VolunteerNav from "./VolunteerNav";
import HomeNav from "./HomeNav";

const Nav = ({ userInfo }) => {
  return (
    <div className="footer">
      {userInfo.is_admin && <AdminNav userInfo={userInfo} />}
      {userInfo.is_minor && <VolunteerNav userInfo={userInfo} />}
      {!userInfo.isLoggedIn && <HomeNav userInfo={userInfo} />}
    </div>
  );
};
export default Nav;
