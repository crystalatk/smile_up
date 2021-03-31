import { useState } from "react";
import { useAlert } from "react-alert";
// import { useHistory } from 'react-router-dom';
import NewMinorAccount from "./NewMinorAccount";
import moment from "moment";

const NewNonMinorAccount = () => {
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
  const [signUpMessage, setSignUpMessage] = useState("");
  const [isGuardian, setIsGuardian] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [isAmbassador, setIsAmbassador] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [adultFormSubmitted, setAdultFormSubmitted] = useState(false);
  const myAlert = useAlert();
  // const history = useHistory();

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

  const _handleSignUpMessageChange = (e) => {
    setSignUpMessage(e.target.value);
  };

  const _handleIsGuardianChange = (e) => {
    e.target.value === "yes" ? setIsGuardian(true) : setIsGuardian(false);
  };

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
              sign_up_message: signUpMessage,
              is_guardian: isGuardian,
              is_minor: isMinor,
              is_ambassador: isAmbassador,
            }),
          }
        ).then((response) => response);
        myAlert.success("Your account has been created!");
        setFirstName("");
        setLastName("");
        setPasswordsMatch(true);
        setPassword("");
        setPassword2("");
        setPhoneNumber("");
        setUsername("");
        setZipCode("");
        setDateOfBirth("");
        setEmail("");
        setEmergencyName("");
        setEmergencyPhone("");
        setSignUpMessage("");
        setIsMinor(false);
        setIsAmbassador(false);
        setUsernameTaken(false);
        setAdultFormSubmitted(true);
        // history.push("/");
        console.log("submit response is ", submitResponse);
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
    <div className="App">
      <h1>Create an Account:</h1>
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
        <label>
          Would you like to include a message to the administrator? If so, enter
          below:
          <input
            type="text"
            value={signUpMessage}
            onChange={_handleSignUpMessageChange}
          ></input>
        </label>
        <label>
          Are you the parent or guardian of a smileUp volunteer who is under the
          age of 18?
          <input
            type="radio"
            value="yes"
            onChange={_handleIsGuardianChange}
            name="is_guardian"
          />{" "}
          Yes
          <input
            type="radio"
            value="no"
            onChange={_handleIsGuardianChange}
            name="is_guardian"
          />{" "}
          No
        </label>
        <button type="submit">Submit</button>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Your username is taken.</h6>
        ) : null}
      </form>
      {adultFormSubmitted && isGuardian ? <NewMinorAccount /> : null}
    </div>
  );
};

export default NewNonMinorAccount;
