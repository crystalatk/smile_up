import { Route, Link } from "react-router-dom";
import Welcome from "./Welcome";
import LoginVolunteers from "./LoginVolunteers";
import LogoutButton from "./LogoutButton";
import NewNonMinorAccount from "./NewNonMinorAccount";
import NewMinorAccount from "./NewMinorAccount";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      {!!userInfo.isLoggedIn ? (
        <>
          <Welcome userInfo={userInfo} />
          <LogoutButton setUserInfo={setUserInfo} />
        </>
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
