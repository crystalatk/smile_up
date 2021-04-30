import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: "8px",
    margin: theme.spacing(1),
  },
}));

const EventListApproved = ({ userInfo }) => {
  const [approvedMinorEvents, setApprovedMinorEvents] = useState([]);
  const [reload, setReload] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const fetchMinorsEvents = async () => {
      const guardianEventResponse = await fetch(
        `http://127.0.0.1:3232/events/approvedeventsbyguardianid/?guardian_id=${userInfo.id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      ).then((response) => response.json());
      setApprovedMinorEvents(
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
      await fetch(
        `http://127.0.0.1:3232/guardians/insertguardiandeniedbyactiviesID`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
          }),
        }
      ).then((response) => response);
    };
    fetchInsertIntoGuardianRemoved();
    setReload(!reload);
  };

  return (
    <>
      <h1>Approved Upcoming Events:</h1>
      <div className="sign-up-container">
        {!userInfo.is_guardian && !userInfo.is_minor && (
          <h1>You have no minors linked to this account.</h1>
        )}
        {userInfo.is_guardian && !!approvedMinorEvents.length && (
          <h3>Here are the approved Events for your minors: </h3>
        )}
        {userInfo.is_minor && (
          <h3>Here are the approved Events by your guardian: </h3>
        )}
        {!approvedMinorEvents.length && (
          <h3>You have no approved upcoming events.</h3>
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

                {userInfo.is_guardian && (
                  <div>
                    <h3 className="f-poppins fs-14">
                      {event.first_name} has been approved to attend this event.
                    </h3>
                    <Button
                      color="secondary"
                      variant="contained"
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

export default EventListApproved;
