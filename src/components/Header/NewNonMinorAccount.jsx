import { useState } from "react";
import { useAlert } from "react-alert";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Fab from "@material-ui/core/Fab";
import NewMinorAccountBridge from "./NewMinorAccountBridge";
import Modal from "./Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      display: "flex",
      flexWrap: "wrap",
      margin: theme.spacing(1),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "75ch",
      },
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },
  Fab: {
    marginBottom: theme.spacing(10),
  },
  InputLabel: {},
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

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
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [guardianId, setGuardianId] = useState("");
  const [adultFormSubmitted, setAdultFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const myAlert = useAlert();
  const classes = useStyles();

  const _handleUsernameChange = (e) => {
    setUsername(e.target.value.replace(/'/g, "''"));
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value.replace(/'/g, "''"));
    if (password2.length) {
      if (password2 === e.target.value) {
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }
    }
    if (e.target.value.length === 0) {
      setPasswordsMatch(true);
    }
  };

  const _handlePassword2Change = (e) => {
    setPassword2(e.target.value.replace(/'/g, "''"));
    if (password.length <= e.target.value.length) {
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
    setFirstName(e.target.value.replace(/'/g, "''"));
  };

  const _handleLastNameChange = (e) => {
    setLastName(e.target.value.replace(/'/g, "''"));
  };

  const _handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value.replace(/'/g, "''"));
  };

  const _handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value.replace(/'/g, "''"));
  };

  const _handleEmailChange = (e) => {
    setEmail(e.target.value.replace(/'/g, "''"));
  };

  const _handleZipCodeChange = (e) => {
    setZipCode(e.target.value.replace(/'/g, "''"));
  };

  const _handleEmergencyNameChange = (e) => {
    setEmergencyName(e.target.value.replace(/'/g, "''"));
  };

  const _handleEmergencyPhoneChange = (e) => {
    setEmergencyPhone(e.target.value.replace(/'/g, "''"));
  };

  const _handleSignUpMessageChange = (e) => {
    setSignUpMessage(e.target.value.replace(/'/g, "''"));
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
              emergency_phone: emergencyPhone,
              sign_up_message: signUpMessage,
              is_guardian: isGuardian,
              is_minor: isMinor,
              is_ambassador: isAmbassador,
            }),
          }
        ).then((response) => response.json());
        myAlert.success("Your account has been created!");
        if (isGuardian) {
          setGuardianId(submitResponse.id);
        }
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
    <div className="create-account">
      <h1>Create an Account:</h1>
      <h2>
        You must be 18 years or older to create an account. If you need to
        register a minor with smileUp, you will have the option to do so
        immediately after creating your account.
      </h2>
      <form className={classes} onSubmit={_handleSubmit}>
        <div>
          <FormControl>
            <TextField
              required
              id="outlined-required-username"
              label="Create Username"
              variant="outlined"
              value={username}
              margin="dense"
              onChange={_handleUsernameChange}
              type="text"
            />
            {!!usernameTaken ? (
              <h6 className="f-red f-small">Please choose another username.</h6>
            ) : null}

            <TextField
              id="outlined-password1-input"
              label="Create a Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={_handlePasswordChange}
              required
            />

            <TextField
              id="outlined-password2-input"
              label="Retype your password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              value={password2}
              onChange={_handlePassword2Change}
              required
            />
          </FormControl>
          <h6
            className={
              !!passwordsMatch
                ? "f-background-color f-small m-0"
                : "f-red f-small m-0"
            }
          >
            Your passwords do not match
          </h6>
          <TextField
            required
            id="outlined-required-first-name"
            label="First Name"
            variant="outlined"
            value={firstName}
            margin="dense"
            onChange={_handleFirstNameChange}
            type="text"
          />

          <TextField
            required
            id="outlined-required-last-name"
            label="Last Name"
            variant="outlined"
            value={lastName}
            margin="dense"
            onChange={_handleLastNameChange}
            type="text"
          />

          <TextField
            required
            id="outlined-required-date-of-birth"
            label="Date of Birth"
            variant="outlined"
            value={dateOfBirth}
            margin="dense"
            onChange={_handleDateOfBirthChange}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            required
            id="outlined-required-email"
            label="Email"
            variant="outlined"
            margin="dense"
            type="email"
            value={email}
            onChange={_handleEmailChange}
          />
          <TextField
            required
            id="outlined-required-zipcode"
            label="Zip Code"
            variant="outlined"
            margin="dense"
            type="text"
            value={zipCode}
            onChange={_handleZipCodeChange}
          />
          <FormControl>
            <InputLabel htmlFor="num">Phone Number</InputLabel>
            <Input
              required
              name="num"
              id="num"
              inputComponent={TextMaskCustom}
              margin="dense"
              value={phoneNumber}
              onChange={_handlePhoneNumberChange}
            />
          </FormControl>
        </div>
        <div>
          <TextField
            required
            id="outlined-required-e-name"
            label="Emergency Contact Full Name"
            variant="outlined"
            margin="normal"
            type="text"
            value={emergencyName}
            onChange={_handleEmergencyNameChange}
          />{" "}
          <br />
          <FormControl>
            <InputLabel className={classes.root} htmlFor="enum">
              Emergency Contact #
            </InputLabel>
            <Input
              required
              name="enum"
              id="enum"
              // inputComponent={TextMaskCustom}
              margin="normal"
              value={emergencyPhone}
              onChange={_handleEmergencyPhoneChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Are you the parent or guardian of a smileUp volunteer who is under
              the age of 18?
            </FormLabel>
            <label
              aria-label="gender"
              name="is_guardian"
              onChange={_handleIsGuardianChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
                checked={isGuardian}
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No"
                checked={!isGuardian}
              />
            </label>
          </FormControl>{" "}
          <br />
          <TextField
            className={classes.root}
            required
            id="MuiTextField-root"
            label="Optional message to the administrator  "
            variant="outlined"
            multiline
            rows={6}
            margin="normal"
            type="text"
            value={signUpMessage}
            onChange={_handleSignUpMessageChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>

        <div>
          <Fab type="submit" size="large" onClick={() => setShowModal(true)}>
            Submit
          </Fab>
        </div>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Your username is taken.</h6>
        ) : null}
      </form>
      {adultFormSubmitted && isGuardian ? (
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
          <NewMinorAccountBridge guardianId={guardianId} />
        </Modal>
      ) : null}
    </div>
  );
};

export default NewNonMinorAccount;
