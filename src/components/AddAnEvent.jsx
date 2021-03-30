import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const AddAnEvent = () => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [stopTime, setStopTime] = useState(new Date());
  const [dateStart, setDateStart] = useState("");
  const [dateStop, setDateStop] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [headcountServedPotential, setHeadcountServedPotential] = useState("");
  const [signupDeadlineDate, setSignupDeadlineDate] = useState(new Date());
  const [signupDeadline, setSignupDeadline] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [adultsNeeded, setAdultsNeeded] = useState(false);
  const [numAdults, setNumAdults] = useState("");
  const [alerts, setAlerts] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const myAlert = useAlert();

  //   functions to handle Input changes
  const _handleAdultsNeeded = (e) => {
    adultsNeeded ? setAdultsNeeded(false) : setAdultsNeeded(true);
    setIsChecked(true);
  };

  useEffect(() => {
    if (startDate) {
      if (startTime) {
        console.log(startTime);
        const totalDateStart =
          moment(startDate).format("YYYY-MM-DD") +
          " " +
          moment(startTime).format("HH:MM:SS");
        setDateStart(totalDateStart);
      }
      if (stopTime) {
        const totalDateStop =
          moment(startDate).format("YYYY-MM-DD") +
          " " +
          moment(stopTime).format("HH:MM:SS");
        setDateStop(totalDateStop);
      }
      if (signupDeadlineDate) {
        setSignupDeadline(
          `${moment(signupDeadlineDate).format("YYYY-MM-DD")} 00:00:00`
        );
      }
    }
  }, [startDate, startTime, stopTime, signupDeadlineDate]);

  // useEffect for consoling....
  useEffect(() => {
    console.log("THIS IS ADULTS NEEDED: ", adultsNeeded);
    console.log("THIS IS SIGN UP DEADLINE: ", signupDeadline);
    console.log("THIS IS THE HEADCOUNT SERVED :", headcountServedPotential);
    console.log("THIS IS THE MIN AGE: ", ageMin);
    console.log("THIS IS THE DATE START AND DATE STOP: ", dateStart, dateStop);
  }, [
    adultsNeeded,
    headcountServedPotential,
    dateStart,
    dateStop,
    ageMin,
    signupDeadline,
  ]);

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
    setStartDate(new Date());
    setDateStop("");
    setDateStart("");
    setSignupDeadlineDate(new Date());
    setStartTime(new Date());
    setStopTime(new Date());
    setLocation("");
    setDescription("");
    setHeadcountServedPotential("");
    setAgeMin("");
    setMinParticipants("");
    setMaxParticipants("");
    setAdultsNeeded(false);
    setNumAdults("");
    setAlerts("");
    setSignupDeadline("");
    setIsChecked(false);
  };

  return (
    <>
      <h1>This is the AddAnEvent</h1>
      <form onSubmit={_handleSubmit}>
        <label>
          Event Title
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
        </label>
        <label>
          Event Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/dd/yyyy"
            showMonthDropdown
            required
          />
        </label>
        <label>
          Event Start Time
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            required
          />
        </label>
        <label>
          Event End Time
          <DatePicker
            selected={stopTime}
            onChange={(date) => setStopTime(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            required
          />
        </label>
        <label>
          Event Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Event Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Total Smiles we will give
          <input
            type="text"
            value={headcountServedPotential}
            onChange={(e) => setHeadcountServedPotential(e.target.value)}
            required
          />
        </label>
        <label>
          Minimum Age
          <input
            type="text"
            value={ageMin}
            onChange={(e) => setAgeMin(e.target.value)}
            required
          />
        </label>
        <label>
          Minimum Participants
          <input
            type="text"
            value={minParticipants}
            onChange={(e) => setMinParticipants(e.target.value)}
            required
          />
        </label>
        <label>
          Maximum Participants
          <input
            type="text"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            required
          />
        </label>
        <label>
          Adults Needed
          <input
            type="checkbox"
            onChange={_handleAdultsNeeded}
            checked={isChecked}
            required
          />
        </label>
        {!!adultsNeeded ? (
          <label>
            Number of Adults Needed
            <input
              type="text"
              value={numAdults}
              onChange={(e) => setNumAdults(e.target.value)}
              required
            />
          </label>
        ) : null}

        <label>
          Alerts:
          <textarea
            value={alerts}
            onChange={(e) => setAlerts(e.target.value)}
            required
          />
        </label>
        <label>
          Sign-up Deadline:
          <DatePicker
            selected={!!signupDeadlineDate ? signupDeadlineDate : startDate}
            onChange={
              (date) => setSignupDeadlineDate(date)
              // console.log(`${moment(date).format("YYYY-MM-DD")} 00:00:00`)
            }
            showMonthDropdown
            required
          />
        </label>
        <button type="submit">Create my Event</button>
      </form>
    </>
  );
};

export default AddAnEvent;
