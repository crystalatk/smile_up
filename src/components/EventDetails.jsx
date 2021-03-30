import moment from "moment";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EventDetails = () => {
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
      <h1>This is the event details page</h1>
    </>
  );
};

export default EventDetails;
