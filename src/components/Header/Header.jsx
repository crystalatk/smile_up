import { Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import LoginVolunteers from "./LoginVolunteers";
import LogoutButton from "./LogoutButton";
import NewNonMinorAccount from "./NewNonMinorAccount";
import NewMinorAccount from "./NewMinorAccount";
import Minors from "./Minors";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      {!!userInfo.isLoggedIn ? (
        <div className="header-container">
          <Welcome userInfo={userInfo} />
          <LogoutButton setUserInfo={setUserInfo} />
          {userInfo.is_guardian && <Minors userInfo={userInfo} />}
        </div>
      ) : (
        <>
          <LoginVolunteers setUserInfo={setUserInfo} />
          <h6>
            <Link to="/createaccount">
              Need to create an account? Click here
            </Link>
          </h6>
          <Route path="/createaccount">
            <NewNonMinorAccount />
          </Route>
          <Route path="/newminor/:guardianid">
            <NewMinorAccount />
          </Route>
        </>
      )}
    </>
  );
};
export default Header;
