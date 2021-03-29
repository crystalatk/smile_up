import moment from "moment";
import { useState, useEffect } from "react";

const EventList = () => {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    const current_date = moment().format("YYYY-MM-DD HH:MM:SS");
    console.log(current_date);
    const fetchList = async () => {
      const eventListResponse = await fetch(
        `http://127.0.0.1:3232/events/list?current_date=${current_date}`,
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
          {eventList.map((event) => {
            return (
              <div>
                <h1>{event.title}</h1>
                <h3>{event.date_start}</h3>
                <h3>{event.date_stop}</h3>
                <h3>{event.location}</h3>
                <h3>{event.signup_deadline}</h3>
                <h3>{event.age_min}</h3>
              </div>
            );
          })}
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
