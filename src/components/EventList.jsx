import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EventList = () => {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    console.log();
    const fetchList = async () => {
      const eventListResponse = await fetch(
        `http://127.0.0.1:3232/events/list`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE EVENTS LIST RESPONSE: ", eventListResponse);
      setEventList(eventListResponse);
    };
    fetchList();
  }, []);

  return (
    <>
      <h1>This is the Event List Page</h1>
      {!!eventList ? (
        <>
          <ul>
            {eventList.map((event) => {
              return (
                <li key={event.id}>
                  <Link to={`/event/${event.id}`}>
                    <h1>{event.title}</h1>
                    <h3>Date: {event.date}</h3>
                    <h3>Start Time: {event.stop_time}</h3>
                    <h3>End Time: {event.start_time}</h3>
                    <h3>Location: {event.location}</h3>
                    <h3>You must sign up by: {event.deadline}</h3>
                    <h3>Minimum Age: {event.age_min}</h3>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <>
          <h1>No Upcoming Events.</h1>
          <h3>Please check back later</h3>
        </>
      )}
    </>
  );
};

export default EventList;
