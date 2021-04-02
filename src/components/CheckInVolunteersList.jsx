import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { AutorenewTwoTone } from "@material-ui/icons";
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
    display: "block",
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

const CheckInVolunteersList = ({ event_id }) => {
  const [volunteersAttending, setVolunteersAttending] = useState([]);
  const classes = useStyles();
  const history = useHistory();

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
      console.log(
        "THESE ARE THE VOLUNTEERS ATTENDING",
        volunteersAttendingResponse
      );
      setVolunteersAttending(volunteersAttendingResponse);
    };
    fetchVolunteersAttending();
  }, [event_id]);

  useEffect(() => {
    console.log(volunteersAttending);
  }, [volunteersAttending]);

  return (
    <>
      {!!volunteersAttending.length !== 0 ? (
        <>
          <h2>These Volunteers are attending the event:</h2>
          {volunteersAttending.map((volunteer) => {
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
                </CardContent>
                <CardActions className={classes.actions}>
                  <IconButton aria-label="go to volunteer profile">
                    <AccountCircleIcon
                      className={classes.profile}
                      onClick={(e) => {
                        history.push(`/profile/${volunteer.id}`);
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="check in volunteer">
                    <AssignmentIndIcon
                      className={classes.checkin}
                      onClick={(e) => {
                        history.push(`/profile/${volunteer.id}`);
                      }}
                    />
                  </IconButton>
                  <IconButton aria-label="checkout volunteer">
                    <ExitToAppIcon
                      className={classes.checkout}
                      onClick={(e) => {
                        history.push(`/profile/${volunteer.id}`);
                      }}
                    />
                  </IconButton>
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
