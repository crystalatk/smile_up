import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EventListNeedsApproval = ({ userInfo }) => {
  const [approvedMinorEvents, setApprovedMinorEvents] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchMinorsEvents = async () => {
      const guardianEventResponse = await fetch(
        `http://127.0.0.1:3232/events/needsapprovaleventsbyguardianid/?guardian_id=${userInfo.id}`,
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
        `http://127.0.0.1:3232/events/needsapprovaleventsbyvolunteerid/?volunteer_id=${userInfo.id}`,
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
      <h1>Needs Approval:</h1>
      {userInfo.is_guardian && approvedMinorEvents.length ? (
        <h3>Here are the events awaiting approval for your minors: </h3>
      ) : (
        <h3>You have no awaiting approvals.</h3>
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
              {userInfo.is_guardian && (
                <div>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<ThumbUpIcon />}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<ThumbDownIcon />}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default EventListNeedsApproval;
