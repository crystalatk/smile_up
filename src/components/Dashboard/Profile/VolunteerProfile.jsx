import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import VolunteerHrsById from "./VolunteerHrsById";
import TotalEventsId from "./TotalEventsId";
import moment from "moment";
import Button from "@material-ui/core/Button";
import UploadAvatar from "./UploadAvatar";

const VolunteerProfile = ({ userInfo }) => {
  const { id: initialID } = useParams();
  const id = parseInt(initialID);
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState("");
  const [viewPage, setViewPage] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [reloadPhoto, setReloadPhoto] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchGuardianID = async () => {
      const guardianIDResponse = await fetch(
        `${process.env.REACT_APP_HOST}/volunteers/guardianid?volunteer_id=${id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      setGuardianID(guardianIDResponse?.guardian_id);
    };

    const fetchProfileData = async () => {
      const profileDataResponse = await fetch(
        `${process.env.REACT_APP_HOST}/volunteers/profile?id=${id}`
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      setVolunteerInfo(profileDataResponse);
    };
    if (!userInfo.is_minor) {
      fetchGuardianID();
    } else {
      setGuardianID("");
      setIsProfileGuardian(false);
    }
    fetchProfileData();
  }, [id, userInfo, reloadPhoto]);

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
    setViewPage(userInfo.id === id || userInfo.is_admin || isProfileGuardian);
  }, [id, isProfileGuardian, userInfo]);

  return (
    <>
      {!!viewPage ? (
        <>
          {!!volunteerInfo?.id ? (
            <div className="profile-container">
              <img
                className="profile-avatar"
                src={volunteerInfo.avatar_link}
                alt={`${volunteerInfo.first_name} ${volunteerInfo.last_name}'s avatar`}
              />
              {userInfo.is_guardian && userInfo.id === id && (
                <UploadAvatar
                  id={id}
                  reloadPhoto={reloadPhoto}
                  setReloadPhoto={setReloadPhoto}
                />
              )}
              {userInfo.is_guardian && userInfo.id === guardianID && (
                <UploadAvatar
                  id={id}
                  reloadPhoto={reloadPhoto}
                  setReloadPhoto={setReloadPhoto}
                />
              )}
              <h1>
                {volunteerInfo.first_name} {volunteerInfo.last_name}
              </h1>
              {!!volunteerInfo.is_ambassador ? <h1>Badge Here</h1> : null}
              <h6>
                Member Since{" "}
                {moment(volunteerInfo.date_joined).format("MMM DD, YYYY")}
              </h6>
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
                <>
                  <br />
                  <Button
                    color="primary"
                    onClick={() => history.push(`/profile/editprofile/${id}`)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                </>
              ) : null}
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      ) : (
        <h1>You do not have access to this page.</h1>
      )}
      <Button color="primary" onClick={history.goBack} variant="contained">
        Back
      </Button>
    </>
  );
};

export default VolunteerProfile;
