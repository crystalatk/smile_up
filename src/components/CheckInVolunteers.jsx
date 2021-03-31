import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CheckInVolunteers = ({ event_id }) => {
  const [volunteersAttending, setVolunteersAttending] = useState([]);

  useEffect(() => {
    const fetchVolunteersAttending = async () => {
      const volunteersAttendingResponse = await fetch(
        `http://127.0.0.1:3232/admins/volunteersattending?event_id=${event_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log(
        "THESE ARE THE VOLUNTEERS ATTENDING",
        volunteersAttendingResponse
      );
      setVolunteersAttending(volunteersAttendingResponse);
    };
    fetchVolunteersAttending();
  }, [event_id]);

  useEffect(() => {
    console.log(volunteersAttending);
  }, [volunteersAttending]);

  return (
    <>
      <h1>I am in the CheckInVolunteers</h1>
      {!!volunteersAttending.length !== 0 ? (
        <>
          <h2>These Volunteers are attending the event:</h2>
          <ul>
            {volunteersAttending.map((volunteer) => {
              return (
                <li>
                  <Link to={`/profile/${volunteer.id}`}>
                    <h3>
                      {volunteer.first_name} {volunteer.last_name}
                      <span>Check-in</span>
                    </h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <h3>There are no volunteers signed up for this event.</h3>
      )}
    </>
  );
};

export default CheckInVolunteers;
