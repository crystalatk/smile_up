import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Minors = ({ userInfo }) => {
  const [minorData, setMinorData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchMinors = async () => {
      const minorDataResponse = await fetch(
        `http://127.0.0.1:3232/guardians/getvolunteersforguardianId/?guardian_id=${userInfo.id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(minorDataResponse);
      setMinorData(minorDataResponse);
    };
    fetchMinors();
  }, [userInfo.id]);

  return (
    <div className="avatar-container">
      <div className="avatar-container-minor">
        <h4 className="f-med-teal m-5">My Minors</h4>
        {minorData?.map((minor) => {
          return (
            <div className="avatar-container-minor">
              <img
                src={minor.avatar_link}
                alt={`${minor.first_name}'s profile Image`}
                className="avatar-image-minor"
                onClick={() => history.push(`/profile/myprofile/${minor.id}`)}
              />
              <h4 className="avatar-name-minor">{minor.first_name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Minors;
