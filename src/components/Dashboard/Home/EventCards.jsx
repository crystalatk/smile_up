import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const EventCards = ({ userInfo, title }) => {
  const [arrayToMap, setArrayToMap] = useState([]);

  useEffect(() => {
    if (title === "Needs Approval") {
      const fetchMinorsEvents = async () => {
        const guardianEventResponse = await fetch(
          `http://127.0.0.1:3232/events/needsapprovaleventsbyguardianid/?guardian_id=${userInfo.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((response) => response.json());
        console.log(
          "THIS IS THE guardianEventRESPONSE: ",
          guardianEventResponse
        );
        setArrayToMap(
          guardianEventResponse.sort((a, b) => a.event_id - b.event_id)
        );
      };
      const fetchNeedsApprovedEventsForMinor = async () => {
        const needsApprovedEventsForMinorResponse = await fetch(
          `http://127.0.0.1:3232/events/needsapprovaleventsbyvolunteerid/?volunteer_id=${userInfo.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((response) => response.json());
        console.log(
          "THIS IS THE NeedsAPPROVED EVENTS FOR MINOR RESPONSE: ",
          needsApprovedEventsForMinorResponse
        );
        setArrayToMap(needsApprovedEventsForMinorResponse);
      };
      if (userInfo.is_guardian) {
        fetchMinorsEvents();
      }
      if (userInfo.is_minor) {
        fetchNeedsApprovedEventsForMinor();
      }
    }
    if (title === "My Events (Approved)") {
      const fetchMinorsEvents = async () => {
        const guardianEventResponse = await fetch(
          `http://127.0.0.1:3232/events/approvedeventsbyguardianid/?guardian_id=${userInfo.id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        ).then((response) => response.json());
        console.log(
          "THIS IS THE guardianEventRESPONSE: ",
          guardianEventResponse
        );
        setArrayToMap(
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
        setArrayToMap(approvedEventsForMinorResponse);
      };
      if (userInfo.is_guardian) {
        fetchMinorsEvents();
      }
      if (userInfo.is_minor) {
        fetchApprovedEventsForMinor();
      }
    }
    if (title === "Upcoming Events") {
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
        setArrayToMap(eventListResponse);
      };
      fetchList();
    }
  }, [userInfo]);

  return (
    <>
      {arrayToMap.slice(0, 2).map((event) => {
        return (
          <div key={event.id} className="event-card">
            <div>
              <h3 className="inline f-med-dark">
                <Link to={`/events/eventdetails/${event.event_id || event.id}`}>
                  {event.title}
                </Link>
              </h3>
              <h6 className="m-0 f-poppins f-dark-orange">
                Sign-up by: {moment(event.signup_deadline).format("MMM DD")}
              </h6>
            </div>
            <div className="event-avatar-container-minor m-5 inline">
              {event.avatar_link && (
                <>
                  <img
                    src={event.avatar_link}
                    alt={`${event.first_name}'s profile Image`}
                    className="avatar-image-minor-card"
                  />

                  <h4 className="avatar-name-minor">{event.first_name}</h4>
                </>
              )}
            </div>
          </div>
        );
      })}
      {arrayToMap.length === 0 && (
        <h3 className="f-med-dark">No Pending Events...Sign up today!</h3>
      )}
    </>
  );
};

export default EventCards;
