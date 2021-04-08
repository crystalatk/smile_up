
import Welcome from "./Welcome";
import LoginVolunteers from "./LoginVolunteers";
import LogoutButton from "./LogoutButton"
import Minors from "./Minors";
import smilelg from "../../images/smilelg.gif";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      {!!userInfo.isLoggedIn && (
        <div className="header-container">
          <Welcome userInfo={userInfo} />
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
