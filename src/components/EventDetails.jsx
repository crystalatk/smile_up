import moment from "moment";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EventDetails = ({ userInfo }) => {
  const { id } = useParams();
  const [event, setEvent] = useState();

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
    };
    fetchEvent();
  }, []);
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
            <button>Sign Up!</button>
          ) : (
            <p>
              Please <Link to="/login">Login</Link> to signup for this event.
            </p>
          )}
          {!!userInfo.isAdmin ? null : null}
        </>
      ) : (
        <h1>Event Loading.....</h1>
      )}
    </>
  );
};

export default EventDetails;
