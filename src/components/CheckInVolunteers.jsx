import { useState, useEffect } from "react";

const CheckInVolunteers = ({ event_id }) => {
  const [volunteersAttending, setVolunteersAttending] = useState([]);
  const [infoForVolunteersAttending, setInfoForVolunteersAttending] = useState(
    []
  );

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
  }, []);

  useEffect(() => {
    volunteersAttending?.map((volunteer, i) => {
      const fetchVolunteerInfo = async () => {
        const volunteerInfoResponse = await fetch(
          `http://127.0.0.1:3232/admins/volunteerinfo?volunteer_id=${volunteer.volunteer_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then((response) => response.json())
          .catch((e) => {
            console.log(e);
          });
        console.log("THIS IS THE VOLUNTEER INFO: ", volunteerInfoResponse);
        setInfoForVolunteersAttending([
          ...infoForVolunteersAttending,
          volunteerInfoResponse,
        ]);
      };
      fetchVolunteerInfo();
    });
  }, [volunteersAttending]);

  useEffect(() => {
    console.log(
      "THIS IS THE INFO FOR THE VOLUNTEERS!",
      infoForVolunteersAttending
    );
  }, [infoForVolunteersAttending]);
  return (
    <>
      <h1>I am in the CheckInVolunteers</h1>
      {!!volunteersAttending.length === 0 ? (
        <>
          <h2>These Volunteers are attending the event</h2>
        </>
      ) : (
        <h3>There are no volunteers signed up for this event.</h3>
      )}
    </>
  );
};

export default CheckInVolunteers;
