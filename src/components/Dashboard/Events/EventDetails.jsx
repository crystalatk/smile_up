import moment from "moment";
import { useState, useEffect } from "react";
import { Link, Route, useParams, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CheckInVolunteersList from "./CheckInVolunteersList";

const EventDetails = ({ userInfo, setEventDetailsForEditPurposes }) => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [volunteersSignedUp, setVolunteersSignedUp] = useState([]);
  const [spotsRemaining, setSpotsRemaining] = useState("");
  const history = useHistory();

  const _onSignUpClick = (e) => {
    e.preventDefault();
    userInfo.is_minor
      ? history.push(`/events/minorsignup/${id}`)
      : history.push(`/events/guardiansignup/${id}`);
  };

  useEffect(() => {
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
      setEvent(eventResponse);
      setEventDetailsForEditPurposes(eventResponse);
    };
    const fetchVolunteersSignedUp = async () => {
      const VolSignedUpResponse = await fetch(
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
      setVolunteersSignedUp(VolSignedUpResponse);
    };
    fetchEvent();
    fetchVolunteersSignedUp();
  }, [id, setEventDetailsForEditPurposes]);

  useEffect(() => {
    if (event && volunteersSignedUp !== "") {
      const mathNumSpotsRemaining =
        event.max_participants - volunteersSignedUp.length;
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
              {!volunteersSignedUp.some(
                (volunteer) => volunteer.volunteer_id === userInfo.id
              ) ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={_onSignUpClick}
                    disabled={userInfo.age < event.age_min}
                  >
                    Sign Up!
                  </Button>
                  <h6
                    className={
                      userInfo.age < event.age_min
                        ? "f-red f-small m-0"
                        : "f-background-color f-small m-0"
                    }
                  >
                    You are not old enough to sign up for this event.
                  </h6>
                </>
              ) : (
                <h3>You are already signed up for this event!</h3>
              )}

              <Button variant="outlined" onClick={() => history.goBack()}>
                Back
              </Button>
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
                {volunteersSignedUp.length} signed up/{event.min_participants}{" "}
                needed
              </h1>
              <h1>
                {volunteersSignedUp.length} signed up/{event.max_participants}{" "}
                max
              </h1>
              <Button
                variant="outlined"
                onClick={() => history.push("/events/editevent")}
              >
                Edit Event
              </Button>
              <Route>
                <CheckInVolunteersList event_id={id} />
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
