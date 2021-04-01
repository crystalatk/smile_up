import { useEffect, useState } from "react";

const EventsId = ({ id }) => {
  const [eventId, setEventId] = useState("");
  useEffect(() => {
    const getVH = () => {
      fetch(`http://127.0.0.1:3232/events/totalEventsId?volunteer_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setEventId(data[0].count);
        });
    };
    getVH();
  }, []);

  return (
    <>
      <h1>Total Events </h1>
      {!!eventId ? <h2>{eventId}</h2> : <h3>0</h3>}
    </>
  );
};

export default EventsId;
