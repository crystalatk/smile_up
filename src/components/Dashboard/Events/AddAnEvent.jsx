import { useState } from "react";
import { useAlert } from "react-alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAnEvent = () => {
  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [dateStop, setDateStop] = useState(new Date());
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

  const _handleStartDateChange = (e) => {
    setDateStart(e);
    setDateStop(e);
  };

  //   functions to handle Input changes
  const _handleAdultsNeeded = (e) => {
    adultsNeeded ? setAdultsNeeded(false) : setAdultsNeeded(true);
    setIsChecked(true);
  };

  //   Function to Handle Submit
  const _handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_HOST}/admins/addevent`, {
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
    }).then((response) => console.log(response));

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
    <div>
      <h1>This is the AddAnEvent</h1>
      <form onSubmit={_handleSubmit}>
        <div className="label">
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
        </div>
        <div className="label">
          <label>
            Event Start:
            <DatePicker
              selected={dateStart}
              onChange={_handleStartDateChange}
              showTimeSelect
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              shouldCloseOnSelect={true}
              filterTime={filterPassedTime}
              required
            />
          </label>
        </div>
        <div className="label">
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
        </div>
        <div className="label">
          <label>
            Event Location
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value.replace(/‘/g, "''"))}
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Event Description
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.replace(/‘/g, "''"))
              }
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Total Smiles we will give
            <input
              type="number"
              max="1000"
              value={headcountServedPotential}
              onChange={(e) =>
                setHeadcountServedPotential(e.target.value.replace(/‘/g, "''"))
              }
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Minimum Age
            <input
              type="number"
              min="5"
              max="18"
              value={ageMin}
              onChange={(e) => setAgeMin(e.target.value.replace(/‘/g, "''"))}
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Minimum Participants
            <input
              type="number"
              max="1000"
              value={minParticipants}
              onChange={(e) =>
                setMinParticipants(e.target.value.replace(/‘/g, "''"))
              }
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Maximum Participants
            <input
              type="number"
              max="1000"
              value={maxParticipants}
              onChange={(e) =>
                setMaxParticipants(e.target.value.replace(/‘/g, "''"))
              }
              required
            />
          </label>
        </div>
        <div className="label">
          <label>
            Adults Needed
            <input
              type="checkbox"
              onChange={_handleAdultsNeeded}
              checked={isChecked}
            />
          </label>
        </div>
        {!!adultsNeeded ? (
          <div className="label">
            <label>
              Number of Adults Needed
              <input
                type="number"
                max="1000"
                value={numAdults}
                onChange={(e) =>
                  setNumAdults(e.target.value.replace(/‘/g, "''"))
                }
              />
            </label>
          </div>
        ) : null}
        <div className="label">
          <label>
            Alerts:
            <textarea
              value={alerts}
              onChange={(e) => setAlerts(e.target.value.replace(/‘/g, "''"))}
            />
          </label>
        </div>
        <div className="label">
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
        </div>
        <button type="submit">Create my Event</button>
      </form>
    </div>
  );
};

export default AddAnEvent;
