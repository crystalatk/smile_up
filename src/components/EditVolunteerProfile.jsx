import { useState, useParams, useEffect } from "react";

const EditVolunteerProfile = ({ userInfo }) => {
  const { id } = useParams();
  console.log(id);
  const [volunteerInfo, setVolunteerInfo] = useState(
    userInfo?.id === id ? userInfo : {}
  );
  const [isProfileGuardian, setIsProfileGuardian] = useState(false);
  const [guardianID, setGuardianID] = useState(false);
  const [viewPage, setViewPage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  const _handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const _handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const _handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const _handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const _handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const _handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const _handleEmergencyNameChange = (e) => {
    setEmergencyName(e.target.value);
  };

  const _handleEmergencyPhoneChange = (e) => {
    setEmergencyPhone(e.target.value);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
  };

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
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setZipCode("");
        setDateOfBirth("");
        setEmail("");
        setEmergencyName("");
        setEmergencyPhone("");
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
          <div className="App">
            <h1>Create an Account:</h1>
            <form onSubmit={_handleSubmit}>
              <label>
                First Name
                <input
                  type="text"
                  value={firstName}
                  onChange={_handleFirstNameChange}
                  required
                ></input>
              </label>
              <label>
                Last Name
                <input
                  type="text"
                  value={lastName}
                  onChange={_handleLastNameChange}
                  required
                ></input>
              </label>
              <label>
                Date of Birth
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={_handleDateOfBirthChange}
                  required
                ></input>
              </label>
              <label>
                Phone Number
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={_handlePhoneNumberChange}
                  required
                ></input>
              </label>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={_handleEmailChange}
                  required
                ></input>
              </label>
              <label>
                Zip Code
                <input
                  type="text"
                  value={zipCode}
                  onChange={_handleZipCodeChange}
                  required
                ></input>
              </label>
              <label>
                Emergency Contact Name (First & Last)
                <input
                  type="text"
                  value={emergencyName}
                  onChange={_handleEmergencyNameChange}
                  required
                ></input>
              </label>
              <label>
                Emergency Contact Phone Number
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={_handleEmergencyPhoneChange}
                  required
                ></input>
              </label>
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
