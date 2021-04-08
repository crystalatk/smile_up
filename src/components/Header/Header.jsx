import Welcome from "./Welcome";
import LogoutButton from "./LogoutButton";
import TotalEventsId from "../Dashboard/Profile/TotalEventsId";
import VolunteerHrsById from "../Dashboard/Profile/VolunteerHrsById";
import Minors from "./Minors";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      {!!userInfo.isLoggedIn && (
        <div className="header-container">
          <Welcome userInfo={userInfo} />
          {userInfo.is_minor && (
            <div className="">
              <div className="f-poppins f-small flex">
                <TotalEventsId />
              </div>
              <div className="f-poppins f-small flex">
                <VolunteerHrsById />
              </div>
            </div>
          )}
          <div className="middle-items-container">
            <img src="/images/smilelg.gif" className="header-logo" />
            <br />
            <LogoutButton setUserInfo={setUserInfo} />
          </div>

          {userInfo.is_guardian && <Minors userInfo={userInfo} />}
        </div>
      )}
    </>
  );
};
export default Header;
