const LogoutButton = ({ setUserInfo }) => {
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
  };
  return (
    <>
      <button onClick={_handleClick}>Logout</button>
    </>
  );
};

export default LogoutButton;
