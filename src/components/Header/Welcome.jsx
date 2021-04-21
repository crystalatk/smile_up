import { useHistory } from "react-router-dom";

const Welcome = ({ userInfo }) => {
  const history = useHistory();
  return (
    <>
      <div className="avatar-container">
        <img
          src={userInfo.avatar_link}
          alt={`${userInfo.first_name}'s profile`}
          className="avatar-image"
          onClick={() => history.push(`/profile/myprofile/${userInfo.id}`)}
        />
        <h4 className="avatar-name">{userInfo.first_name}</h4>
      </div>
    </>
  );
};

export default Welcome;
