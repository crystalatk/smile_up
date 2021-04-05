import { useState, useEffect } from "react";

const EventListApproved = ({ userInfo }) => {
  const [approvedMinorEvents, setApprovedMinorEvents] = useState([]);

  useEffect(() => {
    const fetchMinorsEvents = async () => {
      const guardianEventResponse = await fetch(
        `http://127.0.0.1:3232/events/approvedeventsbyguardianid/?guardian_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      console.log("THIS IS THE guardianEventRESPONSE: ", guardianEventResponse);
      setApprovedMinorEvents(
        guardianEventResponse.sort((a, b) => a.event_id - b.event_id)
      );
    };
    const fetchApprovedEventsForMinor = async () => {
      const approvedEventsForMinorResponse = await fetch(
        `http://127.0.0.1:3232/events/approvedeventsbyvolunteerid/?volunteer_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      console.log(
        "THIS IS THE APPROVED EVENTS FOR MINOR RESPONSE: ",
        approvedEventsForMinorResponse
      );
      setApprovedMinorEvents(approvedEventsForMinorResponse);
    };
    if (userInfo.is_guardian) {
      fetchMinorsEvents();
    }
    if (userInfo.is_minor) {
      fetchApprovedEventsForMinor();
    }
  }, []);

  useEffect(() => {
    console.log(approvedMinorEvents);
  }, [approvedMinorEvents]);

  return (
    <>
      <h1>This is the Approved EventList</h1>
      {userInfo.is_guardian && approvedMinorEvents.length ? (
        <h3>Here are the approved Events for your minors: </h3>
      ) : (
        <h3>You have no minors attached to this account.</h3>
      )}
      <ul>
        {approvedMinorEvents?.map((event, index) => {
          return (
            <li key={index}>
              {(approvedMinorEvents[index - 1]?.event_id !== event.event_id ||
                index === 0) && <h1>{event.title}</h1>}
              <h3>
                {event.first_name} would like approval to attend this event.
              </h3>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default EventListApproved;
