import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logout: {
    fontSize: "10px",
    margin: "0px",
    padding: "2px",
  },
});

const LogoutButton = ({ setUserInfo }) => {
  const history = useHistory();
  const classes = useStyles();

  const _handleClick = (e) => {
    e.preventDefault();
    setUserInfo({
      isLoggedIn: false,
      id: "",
      is_admin: false,
      is_guardian: false,
      is_minor: false,
      first_name: "",
    });
    history.push("/");
  };
  return (
    <>
      <Button
        className={classes.logout}
        variant="outlined"
        size="small"
        onClick={_handleClick}
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
