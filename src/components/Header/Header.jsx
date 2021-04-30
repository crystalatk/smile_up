import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Welcome from "./Welcome";
import LogoutButton from "./LogoutButton";
import TotalEventsId from "../Dashboard/Profile/TotalEventsId";
import VolunteerHrsById from "../Dashboard/Profile/VolunteerHrsById";
import Minors from "./Minors";

const useStyles = makeStyles({
  logout: {
    fontSize: "10px",
    margin: "0px",
    padding: "2px",
  },
});

const Header = ({ userInfo, setUserInfo }) => {
  const history = useHistory();
  const classes = useStyles();

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
            <img
              src="/images/smilelg.gif"
              alt="SMileUp"
              className="header-logo"
            />
            <br />
            <Button
              className={classes.logout}
              variant="outlined"
              size="small"
              onClick={() => {
                history.push("/donate");
              }}
            >
              Donate
            </Button>

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
