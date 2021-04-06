import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

const LogoutButton = ({ setUserInfo }) => {
  const history = useHistory();
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
      <Button variant="outlined" onClick={_handleClick}>
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
