import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const useStyles = makeStyles({
  root: {
    border: "1px solid black",
    margin: "5px auto",
    maxWidth: 400,
    minWidth: 275,
  },
  title: {
    fontSize: 24,
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  profile: {
    margin: "auto",
  },
  checkin: {
    margin: "auto",
  },
  checkout: {
    margin: "auto",
  },
  pos: {
    marginBottom: 12,
  },
});

const CheckInVolunteersList = ({ event_id, userInfo }) => {
  const [volunteersAttending, setVolunteersAttending] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [searchBoxInput, setSearchBoxInput] = useState("");

  useEffect(() => {
    const fetchVolunteersAttending = async () => {
      const volunteersAttendingResponse = await fetch(
        `http://127.0.0.1:3232/admins/volunteersattending?event_id=${event_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      setVolunteersAttending(volunteersAttendingResponse);
    };
    fetchVolunteersAttending();
  }, [event_id]);

  return (
    <>
      {!!volunteersAttending?.length !== 0 ? (
        <>
          <h2 className="f-dark">These Volunteers are attending the event:</h2>
          <label>
            Search
            <input
              type="text"
              onChange={(e) => {
                setSearchBoxInput(e.target.value);
              }}
            />
          </label>

          {volunteersAttending
            .filter((volunteer) =>
              searchBoxInput
                ? volunteer?.first_name
                    ?.toLowerCase()
                    .includes(searchBoxInput.toLowerCase()) ||
                  volunteer?.last_name
                    ?.toLowerCase()
                    .includes(searchBoxInput.toLowerCase())
                : true
            )
            .map((volunteer) => {
              return (
                <Card key={volunteer.id} className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {volunteer.first_name} {volunteer.last_name}
                    </Typography>
                    {volunteer.total_time ? (
                      <Typography>
                        {volunteer.total_time.hours ? (
                          <span>{volunteer.total_time.hours}hrs & </span>
                        ) : null}
                        {volunteer.total_time.minutes || 0}min
                      </Typography>
                    ) : null}
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <div className="block">
                      <IconButton
                        aria-label="go to volunteer profile"
                        onClick={(e) => {
                          history.push(`/profile/adminview/${volunteer.id}`);
                        }}
                      >
                        <AccountCircleIcon className={classes.profile} />
                      </IconButton>
                      <h6 className="m-0">profile</h6>
                    </div>
                    {volunteer.check_in_time ? null : (
                      <div className="block">
                        <IconButton
                          aria-label="check in volunteer"
                          onClick={(e) => {
                            history.push(`/events/checkin/${volunteer.va_id}`);
                          }}
                        >
                          <AssignmentIndIcon className={classes.checkin} />
                        </IconButton>
                        <h6 className="m-0">check-in</h6>
                      </div>
                    )}
                    {!volunteer.check_out_time && volunteer.check_in_time ? (
                      <div className="block">
                        <IconButton
                          aria-label="checkout volunteer"
                          onClick={(e) => {
                            history.push(`/events/checkout/${volunteer.va_id}`);
                          }}
                        >
                          <ExitToAppIcon className={classes.checkout} />
                        </IconButton>
                        <h6 className="m-0">check-out</h6>
                      </div>
                    ) : null}
                  </CardActions>
                </Card>
              );
            })}
        </>
      ) : (
        <h3>There are no volunteers signed up for this event.</h3>
      )}
    </>
  );
};

export default CheckInVolunteersList;
