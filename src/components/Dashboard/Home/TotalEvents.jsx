import { useEffect, useState } from "react";

const TotalEvents = () => {
  const [totalEvents, setTotalEvents] = useState("");
  useEffect(() => {
    const getEvents = () => {
      fetch(`${process.env.REACT_APP_HOST}/events/counttotalevents`)
        .then((res) => res.json())
        .then((data) => {
          setTotalEvents(data[0].count);
        });
    };
    getEvents();
  }, []);

  return (
    <>
      <h1 className="snippet-header">Total Events</h1>
      <h2 className="snippet-content">{totalEvents}</h2>
    </>
  );
};

export default TotalEvents;
