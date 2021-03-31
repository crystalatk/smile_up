import { useHistory } from "react-router-dom";
const LogoutButton = ({ setUserInfo }) => {
  const history = useHistory();
  const _handleClick = (e) => {
    e.preventDefault();
    setUserInfo({
      isLoggedIn: false,
      id: "",
      is_admin: false,
      is_guardian: false,
      is_minor: true,
      first_name: "",
    });
    history.push("/");
  };
  return (
    <>
      <button onClick={_handleClick}>Logout</button>
    </>
  );
};

export default LogoutButton;
