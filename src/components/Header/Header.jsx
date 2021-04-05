import { Route, Link } from "react-router-dom";
import NewNonMinorAccount from "./NewNonMinorAccount";
import LoginVolunteers from "./LoginVolunteers";
import LogoutButton from "./LogoutButton";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <>
      {!!userInfo.isLoggedIn ? (
        <LogoutButton setUserInfo={setUserInfo} />
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
        </>
      )}
    </>
  );
};
export default Header;
