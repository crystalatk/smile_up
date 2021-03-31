import moment from "moment";
import { useState, useEffect } from "react";
import { Link, Route, useParams } from "react-router-dom";
import CheckInVolunteers from "./CheckInVolunteers";

const EventDetails = ({ userInfo, setEventDetailsForEditPurposes }) => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [volunteersSignedUp, setVolunteersSignedUp] = useState("");
  const [spotsRemaining, setSpotsRemaining] = useState("");

  useEffect(() => {
    console.log("THIS IS THE ID: ", id);
    const fetchEvent = async () => {
      const eventResponse = await fetch(
        `http://127.0.0.1:3232/events/details?id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE EVENT RESPONSE: ", eventResponse);
      setEvent(eventResponse);
      setEventDetailsForEditPurposes(eventResponse);
    };
    const fetchNumVolunteersSignedUp = async () => {
      const numVolSignedUp = await fetch(
        `http://127.0.0.1:3232/admins/counttotalvolbyevent?event_id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE NUMVOLSIGNEDUP: ", numVolSignedUp.rows[0].count);
      setVolunteersSignedUp(numVolSignedUp.rows[0].count);
    };
    fetchEvent();
    fetchNumVolunteersSignedUp();
  }, []);

  useEffect(() => {
    if (event && volunteersSignedUp !== "") {
      const mathNumSpotsRemaining = event.max_participants - volunteersSignedUp;
      console.log("This is the spots reamining", mathNumSpotsRemaining);
      setSpotsRemaining(mathNumSpotsRemaining);
    }
  }, [event, volunteersSignedUp]);
  return (
    <>
      {!!event ? (
        <>
          <h1>{event.title}</h1>
          <h2>
            Join us on {moment(event.date_start).format("MMM DD, YYYY")} from{" "}
            {moment(event.date_start).format("h:MM a")} to{" "}
            {moment(event.date_stop).format("h:MM a")} at {event.location}!
          </h2>
          <h5>
            You must be at least {event.age_min} to participate in this event.
          </h5>
          {event.adults_needed ? (
            <h6>
              We will need at least {event.num_adults} adult volunteers at this
              event.
            </h6>
          ) : null}
          <h3>Details:</h3>
          <p>{event.description}</p>
          <h3>
            Signup Deadline: {moment(event.signup_deadline).format("MMMM DD")}
          </h3>
          <h4>You MUST signup by the deadline!</h4>
          {!!userInfo.isLoggedIn ? (
            <>
              <button>Sign Up!</button>
              {!!userInfo}
            </>
          ) : (
            <p>
              Please <Link to="/login">Login</Link> to signup for this event.
            </p>
          )}
          {/* NEED TO CHANGE THIS AND TAKE AWAY THE OR TRUE! */}
          {!!userInfo.is_admin ? (
            <>
              <h1>Number of Volunteers Signed up</h1>
              <h1>
                {volunteersSignedUp} signed up/{event.min_participants} needed
              </h1>
              <h1>
                {volunteersSignedUp} signed up/{event.max_participants} max
              </h1>
              <Link to="/editevent">
                <button>Edit Event</button>
              </Link>
              <Route>
                <CheckInVolunteers event_id={id} />
              </Route>
            </>
          ) : (
            <>
              <h6>We have {spotsRemaining} more spots! Sign up today!</h6>
            </>
          )}
        </>
      ) : (
        <h1>Event Loading.....</h1>
      )}
    </>
  );
};

export default EventDetails;
