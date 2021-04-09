import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams, useHistory } from "react-router-dom";
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
  const classes = useStyles();

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
    <div className="create-account">
      <h2>Create a new account for your minor:</h2>
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
        {!!passwordsMatch ? null : (
          <h6 className="f-red f-small">Your passwords do not match</h6>
        )}
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
        <FormControl>
          <FormLabel component="legend">
          Would you like to register another minor after you submit this form?
          </FormLabel>
          <label
            aria-label="gender"
            name="is_guardian"
            onChange={_handleNeedsAdditionalFormChange}
          >
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            checked={needsAdditionalForm}
          />
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            checked={!needsAdditionalForm}
          />
          </label>
        </FormControl>{" "}
        </div>
        
        <Fab type="submit" size="large">Submit</Fab>
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
    </div>
  );
};

export default NewMinorAccount;
