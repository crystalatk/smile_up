import { useState, useEffect } from "react";

const EventListApproved = ({ userInfo }) => {
  const [minorData, setMinorData] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    const fetchMinors = async () => {
      const minorDataResponse = await fetch(
        `http://127.0.0.1:3232/guardians/getvolunteersforguardianId/?guardian_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      console.log("THIS IS THE MINORDATARESPONSE: ", minorDataResponse);
      setMinorData(minorDataResponse);
    };
    if (userInfo.is_guardian) {
      fetchMinors();
    }
  }, []);

  useEffect(() => {
    const fetchApprovedEventsForMinor = async (minor) => {
      const approvedEventsForMinorResponse = await fetch(
        `http://127.0.0.1:3232/events/approvedeventsbyvolunteerid/?volunteer_id=${minor.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(
            "THIS IS THE APPROVED EVENTS FOR MINOR RESPONSE: ",
            response
          );
          setApprovedEvents([...approvedEvents, response]);
        });
    };
    if (minorData.length) {
      for (let i = 0; i < minorData.length; i++) {
        const getData = async () => {
          await fetchApprovedEventsForMinor(minorData[i]);
        };
        getData;
      }
    }
    if (userInfo.is_minor) {
      fetchApprovedEventsForMinor(userInfo);
    }
  }, [minorData]);

  useEffect(() => {
    console.log("THESE ARE THE APPROVED EVENTS", approvedEvents);
  }, [approvedEvents]);

  return (
    <>
      <h1>This is the Approved EventList</h1>
      {userInfo.is_guardian && minorData.length ? (
        <h3>Here are the approved Events for your minors: </h3>
      ) : (
        <h3>You have no minors attached to this account.</h3>
      )}
      {approvedEvents?.map((event) => {
        return (
          <>
            <h1>{event.title}</h1>
            <h3></h3>
          </>
        );
      })}
    </>
  );
};

export default EventListApproved;
