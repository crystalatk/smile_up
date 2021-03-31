import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import VHID from "./VolunteerHrsById";
import EventsId from "./TotalEventsId";
import moment from "moment";

const VolunteerProfile = ({ userInfo }) => {
  const { id: initialID } = useParams();
  const id = parseInt(initialID);
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState(false);
  const [viewPage, setViewPage] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const history = useHistory();

  const _handleEditClick = () => {
    history.push(`/editprofile/${id}`);
  };

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
  }, [id]);

  useEffect(() => {
    console.log("USERINFO ID: ", userInfo.id);
    console.log("THIS IS THE ID: ", id);
    console.log("THIS IS THE GUARDIAN ID AFTER IT IS SET: ", guardianID);
    console.log(userInfo);
    setIsProfileGuardian(guardianID === userInfo.id);
    if (userInfo.id === id || userInfo.is_admin || isProfileGuardian) {
      if (userInfo.is_minor) {
        setCanEdit(false);
      } else {
        console.log("I AM HERE IN THE CAN EDIT");
        setCanEdit(true);
      }
    }
  }, [guardianID, id]);

  useEffect(() => {
    console.log(userInfo.id === id);
    console.log(userInfo.is_admin);
    console.log(isProfileGuardian);
    setViewPage(userInfo.id === id || userInfo.is_admin || isProfileGuardian);
  }, [id, isProfileGuardian]);

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
              <h3>
                Birthday:{" "}
                {moment(volunteerInfo.date_of_birth).format("MMM DD, YYYY")}
              </h3>
              <h3>Phone Number: {volunteerInfo.phone}</h3>
              <h3>Email: {volunteerInfo.email}</h3>
              <h3>Zip Code: {volunteerInfo.zip_code}</h3>

              {!volunteerInfo.is_minor ? null : (
                <>
                  <VHID id={volunteerInfo.id} />
                  <EventsId id={volunteerInfo.id} />
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
                <button onClick={_handleEditClick}>Edit</button>
              ) : null}
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
