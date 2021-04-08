import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  const [reload, setReload] = useState(false);
  const classes = useStyles();
  const history = useHistory();

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
  }, [userInfo, reload]);

  const _handleRemoveButton = (id) => {
    const fetchInsertIntoGuardianRemoved = async () => {
      console.log("I MADE IT!", id);
      const insertIntoGuardianRemoved = await fetch(
        `http://127.0.0.1:3232/guardians/insertguardiandeniedbyactiviesID`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
          }),
        }
      ).then((response) => response);
      console.log(insertIntoGuardianRemoved);
      setReload(!reload);
    };
    fetchInsertIntoGuardianRemoved();
  };

  const _handleApproveButton = (id) => {
    const fetchInsertIntoGuardianApproved = async () => {
      console.log("I MADE IT!", id);
      const insertIntoGuardianApproved = await fetch(
        `http://127.0.0.1:3232/guardians/insertguardianapprovedbyactiviesID`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
          }),
        }
      ).then((response) => response);
      console.log(insertIntoGuardianApproved);
      setReload(!reload);
    };
    fetchInsertIntoGuardianApproved();
  };

  useEffect(() => {
    console.log(approvedMinorEvents);
  }, [approvedMinorEvents]);

  return (
    <>
      <h1>Needs Approval:</h1>
      <div className="sign-up-container">
        {userInfo.isLoggedIn && approvedMinorEvents.length ? (
          <h3>Here are the events awaiting approval: </h3>
        ) : (
          <h3>You have no awaiting approvals.</h3>
        )}
        <ul>
          {approvedMinorEvents?.map((event, index) => {
            return (
              <li key={index} className="inner-card">
                {(approvedMinorEvents[index - 1]?.event_id !== event.event_id ||
                  index === 0) && (
                  <h1
                    onClick={() => {
                      history.push(`/events/eventdetails/${event.event_id}`);
                    }}
                  >
                    {event.title}
                  </h1>
                )}
                <h3 className="f-poppins">
                  {event.first_name} would like approval to attend this event.
                </h3>
                {userInfo.is_guardian && (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<ThumbUpIcon />}
                      onClick={() => _handleApproveButton(event.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<ThumbDownIcon />}
                      onClick={() => _handleRemoveButton(event.id)}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default EventListNeedsApproval;
