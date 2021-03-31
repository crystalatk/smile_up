import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VolunteerProfile = ({ userInfo }) => {
  const { id } = useParams();
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );

  useEffect(() => {
    if (userInfo.id !== id) {
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
      fetchProfileData();
    }
  }, []);
  return (
    <>
      <h1>I am in the Volunteer Profile</h1>
    </>
  );
};

export default VolunteerProfile;
