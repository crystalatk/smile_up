import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@material-ui/core/TextField";

const AddAnEvent = () => {
  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [dateStop, setDateStop] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [headcountServedPotential, setHeadcountServedPotential] = useState("");
  const [signupDeadline, setSignupDeadline] = useState(new Date());
  const [ageMin, setAgeMin] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [adultsNeeded, setAdultsNeeded] = useState(false);
  const [numAdults, setNumAdults] = useState(0);
  const [alerts, setAlerts] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const myAlert = useAlert();
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  //   functions to handle Input changes
  const _handleAdultsNeeded = (e) => {
    adultsNeeded ? setAdultsNeeded(false) : setAdultsNeeded(true);
    setIsChecked(true);
  };

  // useEffect for consoling....
  useEffect(() => {
    console.log("THIS IS ADULTS NEEDED: ", adultsNeeded);
    console.log("THIS IS SIGN UP DEADLINE: ", signupDeadline);
    console.log("THIS IS THE HEADCOUNT SERVED :", headcountServedPotential);
    console.log("THIS IS THE MIN AGE: ", ageMin);
  }, [adultsNeeded, headcountServedPotential, ageMin, signupDeadline]);

  //   Function to Handle Submit
  const _handleSubmit = async (e) => {
    e.preventDefault();
    const submitResponse = await fetch(
      `http://127.0.0.1:3232/admins/addevent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          date_start: dateStart,
          date_stop: dateStop,
          location: location,
          description: description,
          headcount_served_potential: headcountServedPotential,
          signup_deadline: signupDeadline,
          age_min: ageMin,
          min_participants: minParticipants,
          max_participants: maxParticipants,
          adults_needed: adultsNeeded,
          num_adults: numAdults,
          alerts: alerts,
        }),
      }
    ).then((response) => response);
    myAlert.success("Your event has been created!");
    setTitle("");
    setSignupDeadline(new Date());
    setDateStart(new Date());
    setDateStop(new Date());
    setLocation("");
    setDescription("");
    setHeadcountServedPotential("");
    setAgeMin("");
    setMinParticipants("");
    setMaxParticipants("");
    setAdultsNeeded(false);
    setNumAdults(0);
    setAlerts("");
    setIsChecked(false);
  };

  return (
    <div className="App">
      <h1>This is the AddAnEvent</h1>
      <form onSubmit={_handleSubmit}>
        <TextField
          label="Event Title"
          type="text"
          variant="outlined"
          margin="dense"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <TextField
          required
          id="outlined-required"
          label="Event Start"
          variant="outlined"
          value={dateStart}
          margin="dense"
          onChange={(date) => setDateStart(date)}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <label>
          Event End:
          <DatePicker
            selected={!!dateStop ? dateStop : dateStart}
            onChange={(date) => setDateStop(date)}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            shouldCloseOnSelect={true}
            filterTime={filterPassedTime}
            required
          />
        </label>
        <label>
          Event Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value.replace(/‘/g, "''"))}
            required
          />
        </label>
        <label>
          Event Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.replace(/‘/g, "''"))}
            required
          />
        </label>
        <label>
          Total Smiles we will give
          <input
            type="text"
            value={headcountServedPotential}
            onChange={(e) =>
              setHeadcountServedPotential(e.target.value.replace(/‘/g, "''"))
            }
            required
          />
        </label>
        <label>
          Minimum Age
          <input
            type="text"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value.replace(/‘/g, "''"))}
            required
          />
        </label>
        <label>
          Minimum Participants
          <input
            type="text"
            value={minParticipants}
            onChange={(e) =>
              setMinParticipants(e.target.value.replace(/‘/g, "''"))
            }
            required
          />
        </label>
        <label>
          Maximum Participants
          <input
            type="text"
            value={maxParticipants}
            onChange={(e) =>
              setMaxParticipants(e.target.value.replace(/‘/g, "''"))
            }
            required
          />
        </label>
        <label>
          Adults Needed
          <input
            type="checkbox"
            onChange={_handleAdultsNeeded}
            checked={isChecked}
          />
        </label>
        {!!adultsNeeded ? (
          <label>
            Number of Adults Needed
            <input
              type="text"
              value={numAdults}
              onChange={(e) => setNumAdults(e.target.value.replace(/‘/g, "''"))}
            />
          </label>
        ) : null}

        <label>
          Alerts:
          <textarea
            value={alerts}
            onChange={(e) => setAlerts(e.target.value.replace(/‘/g, "''"))}
          />
        </label>
        <label>
          Sign-up Deadline:
          <DatePicker
            selected={!!signupDeadline ? signupDeadline : dateStart}
            onChange={(date) => setSignupDeadline(date)}
            showMonthDropdown
            shouldCloseOnSelect={true}
            filterTime={filterPassedTime}
            required
          />
        </label>
        <button type="submit">Create my Event</button>
      </form>
    </div>
  );
};

export default AddAnEvent;
