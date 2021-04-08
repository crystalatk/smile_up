import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import moment from "moment";
import Button from "@material-ui/core/Button";

const EditVolunteerProfile = ({ userInfo }) => {
  const { id: initialID } = useParams();
  const id = parseInt(initialID);
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState(false);
  const [viewPage, setViewPage] = useState(false);
  const [firstName, setFirstName] = useState(
    userInfo?.id === id ? userInfo.first_name : ""
  );
  const [lastName, setLastName] = useState(
    userInfo?.id === id ? userInfo.last_name : ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    userInfo?.id === id ? userInfo.date_of_birth : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo?.id === id ? userInfo.phone : ""
  );
  const [email, setEmail] = useState(userInfo?.id === id ? userInfo.email : "");
  const [zipCode, setZipCode] = useState(
    userInfo?.id === id ? userInfo.zip_code : ""
  );
  const [emergencyName, setEmergencyName] = useState(
    userInfo?.id === id ? userInfo.emergency_name : ""
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    userInfo?.id === id ? userInfo.emergency_phone : ""
  );
  const myAlert = useAlert();
  const history = useHistory();

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const submitResponse = await fetch(
      `http://127.0.0.1:3232/volunteers/editProfile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: moment(dateOfBirth).format("YYYY-MM-DD HH:MM:SS"),
          phone: phoneNumber,
          email: email,
          zip_code: zipCode,
          emergency_name: emergencyName,
          emergency_phone: emergencyPhone,
        }),
      }
    ).then((response) => response);
    myAlert.success("Your account has been updated!");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setZipCode("");
    setDateOfBirth("");
    setEmail("");
    setEmergencyName("");
    setEmergencyPhone("");
    console.log("submit response is ", submitResponse);
    history.push(`/profile/${id}`);
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
      setFirstName(profileDataResponse.first_name);
      setLastName(profileDataResponse.last_name);
      setPhoneNumber(profileDataResponse.phone);
      setZipCode(profileDataResponse.zip_code);
      setDateOfBirth(
        moment(profileDataResponse.date_of_birth).format("YYYY-MM-DD")
      );
      setEmail(profileDataResponse.email);
      setEmergencyName(profileDataResponse.emergency_name);
      setEmergencyPhone(profileDataResponse.emergency_phone);
    };
    if (userInfo?.id !== id && !userInfo?.is_minor) {
      fetchGuardianID();
    }
    fetchProfileData();
    console.log("fetching...");
  }, [id, userInfo?.id, userInfo?.is_minor]);

  useEffect(() => {
    console.log("THIS IS THE GUARDIAN ID", guardianID.guardian_id);
    console.log("THIS IS THE USER INFO ID", userInfo.id);
    console.log(guardianID.guardian_id === userInfo?.id);
    setIsProfileGuardian(guardianID.guardian_id === userInfo?.id);
  }, [guardianID, userInfo, volunteerInfo]);

  useEffect(() => {
    setViewPage(userInfo?.id === id || userInfo?.is_admin || isProfileGuardian);
  }, [guardianID, userInfo, volunteerInfo, id, isProfileGuardian]);

  return (
    <>
      {!!viewPage ? (
        <>
          <div>
            <h1>Edit Information for {volunteerInfo.first_name}</h1>
            <form onSubmit={_handleSubmit}>
              <div className="m-5">
                <label>
                  First Name
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Last Name
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Date of Birth
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Phone Number
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Zip Code
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) =>
                      setZipCode(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Emergency Contact Name (First & Last)
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) =>
                      setEmergencyName(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div className="m-5">
                <label>
                  Emergency Contact Phone Number
                  <input
                    type="text"
                    value={emergencyPhone}
                    onChange={(e) =>
                      setEmergencyPhone(e.target.value.replace(/‘/g, "''"))
                    }
                    required
                  />
                </label>
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Update Information
                </Button>
              </div>
              <div className="m-5">
                <Button
                  type="button"
                  onClick={history.goBack}
                  variant="outlined"
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <h1>You do not have access to this page.</h1>
      )}
    </>
  );
};

export default EditVolunteerProfile;
