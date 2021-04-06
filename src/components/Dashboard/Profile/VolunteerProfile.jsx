import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import VolunteerHrsById from "./VolunteerHrsById";
import TotalEventsId from "./TotalEventsId";
import moment from "moment";
import Button from "@material-ui/core/Button";

const VolunteerProfile = ({ userInfo }) => {
  console.log("I AM HERE");
  const { id: initialID } = useParams();
  console.log(initialID);
  const id = parseInt(initialID);
  console.log(id);
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState("");
  const [viewPage, setViewPage] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchGuardianID = async () => {
      const guardianIDResponse = await fetch(
        `http://127.0.0.1:3232/volunteers/guardianid?volunteer_id=${id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE GUARDIAN ID:", guardianIDResponse);

      setGuardianID(guardianIDResponse?.guardian_id);
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
      console.log("I AM HERE");
      fetchGuardianID();
    } else {
      setGuardianID("");
      setIsProfileGuardian(false);
    }
    fetchProfileData();
  }, [id, userInfo]);

  useEffect(() => {
    if (userInfo.id) {
      setIsProfileGuardian(guardianID === userInfo.id);
    }
  }, [guardianID, id, userInfo.id]);

  useEffect(() => {
    if (userInfo.id === id || userInfo.is_admin || isProfileGuardian) {
      if (userInfo.is_minor) {
        setCanEdit(false);
      } else {
        console.log("I AM HERE IN THE CAN EDIT");
        setCanEdit(true);
      }
    }
  }, [
    guardianID,
    id,
    isProfileGuardian,
    userInfo.id,
    userInfo.is_admin,
    userInfo.is_minor,
  ]);

  useEffect(() => {
    console.log(userInfo.id === id);
    console.log(userInfo.is_admin);
    console.log("PROFILE GUARDIAN???:", isProfileGuardian);
    setViewPage(userInfo.id === id || userInfo.is_admin || isProfileGuardian);
  }, [id, isProfileGuardian, userInfo]);

  return (
    <>
      {!!viewPage ? (
        <>
          {!!volunteerInfo?.id ? (
            <>
              <img src={volunteerInfo.avatar_link} alt={`${volunteerInfo.first_name} ${volunteerInfo.last_name}'s avatar`}/>
              <h1>
                {volunteerInfo.first_name} {volunteerInfo.last_name}
              </h1>
              {!!volunteerInfo.is_ambassador ? <h1>Badge Here</h1> : null}
              <h6>Member since {volunteerInfo.date_joined}.</h6>
              <h3>
                Birthday:{" "}
                {moment(volunteerInfo.date_of_birth).format("MMM DD, YYYY")}
              </h3>
              <h3>Phone Number: {volunteerInfo.phone}</h3>
              <h3>Email: {volunteerInfo.email}</h3>
              <h3>Zip Code: {volunteerInfo.zip_code}</h3>

              {!volunteerInfo.is_minor ? null : (
                <>
                  <VolunteerHrsById id={volunteerInfo.id} />
                  <TotalEventsId id={volunteerInfo.id} />
                  <h2>Emergency Contact Information:</h2>
                  <h3>
                    Emergency Contact Name: {volunteerInfo.emergency_name}
                  </h3>
                  <h3>
                    Emergency Contact Phone Number:{" "}
                    {volunteerInfo.emergency_phone}
                  </h3>
                </>
              )}
              {!!canEdit ? (
                <Button
                  onClick={() => history.push(`/profile/editprofile/${id}`)}
                  variant="outlined"
                >
                  Edit
                </Button>
              ) : null}
            </>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      ) : (
        <h1>You do not have access to this page.</h1>
      )}
      <Button onClick={history.goBack} variant="outlined">
        Back
      </Button>
    </>
  );
};

export default VolunteerProfile;
