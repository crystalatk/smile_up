const Welcome = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <>
      <h1>
        <img src={userInfo.avatar_link} className="avatar-image" />
        Welcome, {userInfo.first_name}!
      </h1>
    </>
  );
};

export default Welcome;
