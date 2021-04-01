import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const CheckInVolunteers = ({ event_id }) => {
  const [volunteersAttending, setVolunteersAttending] = useState([]);
  const classes = useStyles();

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
      <h1>I am in the CheckInVolunteers</h1>
      {!!volunteersAttending.length !== 0 ? (
        <>
          <h2>These Volunteers are attending the event:</h2>
          {volunteersAttending.map((volunteer) => {
            return (
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {volunteer.first_name} {volunteer.last_name}
                  </Typography>
                </CardContent>
                <CardActions></CardActions>
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

export default CheckInVolunteers;
