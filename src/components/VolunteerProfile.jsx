import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VolunteerProfile = ({ userInfo }) => {
  const { id } = useParams();
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState(false);
  const [viewPage, setViewPage] = useState(false);

  useEffect(() => {
    if (userInfo.id !== id) {
      const fetchGuardianID = async () => {
        const guardianIDResponse = await fetch(
          `http://127.0.0.1:3232/volunteers/guardianid?volunteer_id=${id}`
        )
          .then((response) => response.json())
          .catch((e) => {
            console.log(e);
          });
        console.log("THIS IS THE GUARDIAN ID:", guardianIDResponse);
        setGuardianID(guardianIDResponse);
      };

      const fetchProfileData = async () => {
        const profileDataResponse = await fetch(
          `http://127.0.0.1:3232/volunteers/profile?id=${id}`
        )
          .then((response) => response.json())
          .catch((e) => {
            console.log(e);
          });
        console.log("THIS IS THE PROFILE DATA:", profileDataResponse);
        setVolunteerInfo(profileDataResponse);
      };
      if (!userInfo.is_minor) {
        fetchGuardianID();
      }
      fetchProfileData();
    }
  }, []);

  useEffect(() => {
    if (guardianID === userInfo.id) {
      setIsProfileGuardian(true);
    }
    if (userInfo.id === id || userInfo.is_admin || isProfileGuardian) {
      setViewPage(true);
    }
  }, [guardianID]);

  return (
    <>
      {!!viewPage ? (
        <>
          {!!volunteerInfo.id ? (
            <>
              <h1>
                {volunteerInfo.first_name} {volunteerInfo.last_name}
              </h1>
              {!!volunteerInfo.is_ambassador ? <h1>Badge Here</h1> : null}
              <h6>Member since {volunteerInfo.date_joined}.</h6>
              <h3>Birthday: {volunteerInfo.date_of_birth}</h3>
              <h3>Phone Number: {volunteerInfo.phone}</h3>
              <h3>Email: {volunteerInfo.email}</h3>
              <h3>Zip Code: {volunteerInfo.zip_code}</h3>
              <h2>Emergency Contact Information:</h2>
              {!!volunteerInfo.is_minor ? null : (
                <>
                  <h3>
                    Emergency Contact Name: {volunteerInfo.emergency_name}
                  </h3>
                  <h3>
                    Emergency Contact Phone Number:{" "}
                    {volunteerInfo.emergency_phone}
                  </h3>
                </>
              )}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      ) : (
        <h1>You do not have access to this page.</h1>
      )}
    </>
  );
};

export default VolunteerProfile;
