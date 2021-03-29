import { useState, useEffect } from "react";
import { useAlert } from "react-alert";

const AddAnEvent = () => {
  const [title, setTitle] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateStop, setDateStop] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [headcountServedPotential, setHeadcountServedPotential] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [adultsNeeded, setAdultsNeeded] = useState(false);
  const [numAdults, setNumAdults] = useState("");
  const [alerts, setAlerts] = useState("");
  const myAlert = useAlert();

  //   functions to handle Input changes
  const _handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const _handleDateStart = (e) => {
    setDateStart(e.target.value);
  };
  const _handleDateStop = (e) => {
    setDateStop(e.target.value);
  };
  const _handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const _handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const _handleHeadcountServedPotential = (e) => {
    setHeadcountServedPotential(e.target.value);
  };
  const _handleAgeMin = (e) => {
    setAgeMin(e.target.value);
  };
  const _handleMinParticipants = (e) => {
    setMinParticipants(e.target.value);
  };
  const _handleMaxParticipants = (e) => {
    setMaxParticipants(e.target.value);
  };
  const _handleAdultsNeeded = (e) => {
    adultsNeeded ? setAdultsNeeded(false) : setAdultsNeeded(true);
  };
  const _handleNumAdults = (e) => {
    setNumAdults(e.target.value);
  };
  const _handleAlerts = (e) => {
    setAlerts(e.target.value);
  };

  useEffect(() => {
    console.log("THIS IS ADULTS NEEDED: ", adultsNeeded);
  }, [adultsNeeded]);

  //   Function to Handle Submit
  const _handleSubmit = async (e) => {
    e.preventDefault();
    const submitResponse = await fetch(`http://127.0.0.1:3232/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        dateStart: dateStart,
        dateStop: dateStop,
        location: location,
        description: description,
        headcountServedPotential: headcountServedPotential,
        ageMin: ageMin,
        minParticipants: minParticipants,
        maxParticipants: maxParticipants,
        adultsNeeded: adultsNeeded,
        numAdults: numAdults,
        alerts: alerts,
      }),
    }).then((response) => response);
    myAlert.success("Your event has been created!");
    setTitle("");
    setDateStart("");
    setDateStop("");
    setLocation("");
    setDescription("");
    setHeadcountServedPotential("");
    setAgeMin("");
    setMinParticipants("");
    setMaxParticipants("");
    setAdultsNeeded("");
    setNumAdults("");
    setAlerts("");
  };

  return (
    <>
      <h1>This is the AddAnEvent</h1>
      <form>
        <label>
          Event Title
          <input type="text" value={title} onChange={_handleTitleChange} />
        </label>
        <label>
          Event Start
          <input type="text" value={dateStart} onChange={_handleDateStart} />
        </label>
        <label>
          Event End
          <input type="text" value={dateStop} onChange={_handleDateStop} />
        </label>
        <label>
          Event Location
          <input type="text" value={location} onChange={_handleLocation} />
        </label>
        <label>
          Event Description
          <textarea value={description} onChange={_handleDescription} />
        </label>
        <label>
          Total Smiles we will give
          <input
            type="text"
            value={headcountServedPotential}
            onChange={_handleHeadcountServedPotential}
          />
        </label>
        <label>
          Minimum Age
          <input type="text" value={ageMin} onChange={_handleAgeMin} />
        </label>
        <label>
          Minimum Participants
          <input
            type="text"
            value={minParticipants}
            onChange={_handleMinParticipants}
          />
        </label>
        <label>
          Maximum Participants
          <input
            type="text"
            value={maxParticipants}
            onChange={_handleMaxParticipants}
          />
        </label>
        <label>
          Adults Needed
          <input type="checkbox" onChange={_handleAdultsNeeded} />
        </label>
        {!!adultsNeeded ? (
          <label>
            Number of Adults Needed
            <input type="text" value={numAdults} onChange={_handleNumAdults} />
          </label>
        ) : null}

        <label>
          Alerts:
          <textarea value={alerts} onChange={_handleAlerts} />
        </label>
      </form>
    </>
  );
};

export default AddAnEvent;
