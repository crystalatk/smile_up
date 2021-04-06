import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

const NewMinorAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [isGuardian, setIsGuardian] = useState(false);
  const [isMinor, setIsMinor] = useState(true);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [minorFormSubmitted, setMinorFormSubmitted] = useState(false);
  const [needsAdditionalForm, setNeedsAdditionalForm] = useState(false);
  const myAlert = useAlert();
  const { guardianid } = useParams({});
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = await fetch(
        `http://127.0.0.1:3232/volunteers/profile/?id=${guardianid}`
      ).then((response) => response.json());
      console.log("the data is ", data);
      setZipCode(data.zip_code);
      setEmergencyName(`${data.first_name} ${data.last_name}`);
      setEmergencyPhone(data.phone);
    })();
  }, [guardianid]);

  const _handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setPasswordsMatch(true);
    }
  };

  const _handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    if (password.length === e.target.value.length) {
      if (password === e.target.value) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
    if (e.target.value.length === 0) {
      setPasswordsMatch(true);
    }
  };

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

  const _handleNeedsAdditionalFormChange = (e) => {
    console.log(e.target.value === "yes");
    setNeedsAdditionalForm(e.target.value === "yes");
  };

  useEffect(() => {
    console.log("THIS IS THE NEEDS ADDITIONAL USE EFFECT", needsAdditionalForm);
  }, [needsAdditionalForm]);

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const isUsername = await fetch(
      `http://127.0.0.1:3232/login/username/?username=${username}`
    ).then((response) => response.json());
    console.log("THIS IS THE ISUSESRNAME RESPONSE: ", isUsername);
    if (isUsername) {
      if (password2 === password) {
        const submitResponse = await fetch(
          `http://127.0.0.1:3232/login/signupVolunteer`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username,
              password: password,
              first_name: firstName,
              last_name: lastName,
              date_of_birth: moment(dateOfBirth).format("YYYY-MM-DD HH:MM:SS"),
              phone: phoneNumber,
              email: email,
              zip_code: zipCode,
              emergency_name: emergencyName,
              emergencyPhone: emergencyPhone,
              sign_up_message: null,
              is_guardian: isGuardian,
              is_minor: isMinor,
              is_ambassador: isAmbassador,
            }),
          }
        ).then((response) => response.json());
        myAlert.success("Your minor's account has been created!");
        setFirstName("");
        setLastName("");
        setPasswordsMatch(true);
        setPassword("");
        setPassword2("");
        setPhoneNumber("");
        setUsername("");
        setDateOfBirth("");
        setEmail("");
        setIsMinor(true);
        setIsAmbassador(false);
        setUsernameTaken(false);
        setMinorFormSubmitted(true);
        setIsGuardian(false);
        !needsAdditionalForm && history.push("/");
        console.log("submit response is ", submitResponse);
        await fetch(`http://127.0.0.1:3232/volunteers/linkminor`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            minor_id: submitResponse.id,
            guardian_id: guardianid,
          }),
        }).then((response) => response.json());
      } else {
        myAlert.error("You broke it...");
      }
    } else {
      myAlert.error("You broke it!");
      setTimeout(() => {
        myAlert.error("Just kidding.");
      }, 1000);
      setTimeout(() => {
        myAlert.error("That username is super popular.");
      }, 2000);
      setTimeout(() => {
        myAlert.error("Choose something else.");
      }, 3000);
      setUsernameTaken(true);
    }
  };

  return (
    <>
      <h3>Create a new account for your minor:</h3>
      <form onSubmit={_handleSubmit}>
        <label>
          Create Username
          <input
            type="text"
            value={username}
            onChange={_handleUsernameChange}
            required
          ></input>
        </label>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Please choose another username.</h6>
        ) : null}
        <label>
          Create a Password
          <input
            type="password"
            value={password}
            onChange={_handlePasswordChange}
            required
          ></input>
        </label>
        <label>
          Retype your password
          <input
            type="password"
            value={password2}
            onChange={_handlePassword2Change}
            required
          ></input>
        </label>
        {!!passwordsMatch ? null : (
          <h6 className="f-red f-small">Your passwords do not match</h6>
        )}
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
          ></input>
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={_handleEmailChange}
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
        <label>
          Would you like to register another minor after you submit this form?
          <input
            type="radio"
            value="yes"
            onChange={_handleNeedsAdditionalFormChange}
            name="is_guardian"
            checked={needsAdditionalForm}
          />{" "}
          Yes
          <input
            type="radio"
            value="no"
            onChange={_handleNeedsAdditionalFormChange}
            name="is_guardian"
            checked={!needsAdditionalForm}
          />{" "}
          No
        </label>
        <button type="submit">Submit</button>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Your username is taken.</h6>
        ) : null}
      </form>
      {minorFormSubmitted && needsAdditionalForm ? (
        <p>
          Your minor was registered. Please use the the same form to register
          additional minors.
        </p>
      ) : null}
    </>
  );
};

export default NewMinorAccount;
