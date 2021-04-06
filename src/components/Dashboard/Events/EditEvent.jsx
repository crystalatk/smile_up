import { useState } from "react";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@material-ui/core/Button";

const EditEvent = ({ eventDetailsForEditPurposes }) => {
  const [title, setTitle] = useState(eventDetailsForEditPurposes.title);
  const [dateStart, setDateStart] = useState(
    new Date(eventDetailsForEditPurposes.date_start)
  );
  const [dateStop, setDateStop] = useState(
    new Date(eventDetailsForEditPurposes.date_stop)
  );
  const [location, setLocation] = useState(
    eventDetailsForEditPurposes.location
  );
  const [description, setDescription] = useState(
    eventDetailsForEditPurposes.description
  );
  const [headcountServedPotential, setHeadcountServedPotential] = useState(
    eventDetailsForEditPurposes.headcount_served_potential
  );
  const [signupDeadline, setSignupDeadline] = useState(
    new Date(eventDetailsForEditPurposes.signup_deadline)
  );
  const [ageMin, setAgeMin] = useState(eventDetailsForEditPurposes.age_min);
  const [minParticipants, setMinParticipants] = useState(
    eventDetailsForEditPurposes.min_participants
  );
  const [maxParticipants, setMaxParticipants] = useState(
    eventDetailsForEditPurposes.max_participants
  );
  const [adultsNeeded, setAdultsNeeded] = useState(
    eventDetailsForEditPurposes.adults_needed
  );
  const [numAdults, setNumAdults] = useState(
    eventDetailsForEditPurposes.num_adults
  );
  const [alerts, setAlerts] = useState(eventDetailsForEditPurposes.alerts);
  const [isChecked, setIsChecked] = useState(
    eventDetailsForEditPurposes.adults_needed
  );
  const myAlert = useAlert();
  const history = useHistory();
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  //   functions to handle Input changes
  const _handleAdultsNeeded = (e) => {
    if (adultsNeeded) {
      setAdultsNeeded(false);
      setNumAdults(0);
      setIsChecked(false);
    } else {
      setAdultsNeeded(true);
      setIsChecked(true);
    }
  };

  //   Function to Handle Submit
  const _handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:3232/admins/editevent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventDetailsForEditPurposes.id,
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
    }).then((response) => response);
    myAlert.success("Your event has been updated!");
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
    history.push(`/event/${eventDetailsForEditPurposes.id}`);
  };

  return (
    <>
      <h1>This is the EditEvent</h1>
      <form onSubmit={_handleSubmit}>
        <label>
          Event Title
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value.replace(/‘/g, "''"));
            }}
            required
          />
        </label>
        <label>
          Event Start:
          <DatePicker
            selected={dateStart}
            onChange={(date) => setDateStart(date)}
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
            onChange={
              (date) => setSignupDeadline(date)
              // console.log(`${moment(date).format("YYYY-MM-DD")} 00:00:00`)
            }
            showMonthDropdown
            shouldCloseOnSelect={true}
            filterTime={filterPassedTime}
            required
          />
        </label>
        <Button type="submit" variant="outlined">
          Update my Event
        </Button>
      </form>
      <Button
        type="button"
        variant="outlined"
        onClick={(e) => {
          history.push(
            `/events/eventdetails/${eventDetailsForEditPurposes.id}`
          );
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export default EditEvent;
