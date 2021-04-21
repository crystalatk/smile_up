import { useEffect, useState } from "react";

const TotalEventsId = ({ id }) => {
  const [eventId, setEventId] = useState("");
  useEffect(() => {
    const getVH = () => {
      fetch(`${process.env.REACT_APP_HOST}/events/totalEventsId?volunteer_id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setEventId(data[0].count);
        });
    };
    getVH();
  }, [id]);

  return (
    <div className="block">
      <h1 className="m-0">Total Events</h1>
      {!!eventId ? (
        <h2 className="m-0">{eventId}</h2>
      ) : (
        <h3 className="m-0">0</h3>
      )}
    </div>
  );
};

export default TotalEventsId;
