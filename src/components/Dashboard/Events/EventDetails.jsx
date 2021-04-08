import { useState, useEffect } from "react";
import { Link, Route, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CheckInVolunteersList from "./CheckInVolunteersList";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(247, 219, 182, 1)",
    border: "1px solid rgb(251, 247, 243, 0.85)",
    float: "none",
    margin: "2em auto",
    maxWidth: 600,
    minHeight: "90%",
    padding: "5px",
    position: "relative",
    width: "100%",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  listRoot: {
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  subheader: {
    color: "#002c2b",
    fontSize: "36px",
    fontFamily: `"Luckiest Guy", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;"`,
    marginTop: "20px",
  },
  title: {
    color: "rgb(251, 247, 243)",
    fontSize: "28px",
    fontFamily: `"Luckiest Guy", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;"`,
    padding: "10px",
  },
  titleContainer: {
    backgroundColor: "rgb(0, 44, 43)",
    marginBottom: "5px",
    padding: "0px",
  },
  infoHeader: {
    textAlign: "center",
  },
  infoContainer: {
    backgroundColor: "rgb(251, 247, 243, 0.85)",
    marginBottom: "5px",
    padding: "0px",
    paddingBottom: "0px",
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  description: {
    fontSize: "20px",
    textAlign: "center",
  },
  center: {
    textAlign: "center",
  },
}));

const EventDetails = ({ userInfo, setEventDetailsForEditPurposes }) => {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [volunteersSignedUp, setVolunteersSignedUp] = useState([]);
  const [spotsRemaining, setSpotsRemaining] = useState("");
  const [documentArray, setDocumentArray] = useState([]);
  const history = useHistory();
  const eventDocsArray = (eventId) =>
    documentArray.filter((doc) => doc.event_id === eventId);
  const classes = useStyles();

  const _onSignUpClick = (e) => {
    e.preventDefault();
    userInfo.is_minor
      ? history.push(`/events/minorsignup/${id}`)
      : history.push(`/events/guardiansignup/${id}`);
  };

  useEffect(() => {
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
      setEvent(eventResponse);
      setEventDetailsForEditPurposes(eventResponse);
    };
    const fetchVolunteersSignedUp = async () => {
      const VolSignedUpResponse = await fetch(
        `http://127.0.0.1:3232/admins/counttotalvolbyevent?event_id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      setVolunteersSignedUp(VolSignedUpResponse);
    };
    fetchEvent();
    fetchVolunteersSignedUp();
  }, [id, setEventDetailsForEditPurposes]);

  useEffect(() => {
    if (event && volunteersSignedUp !== "") {
      const mathNumSpotsRemaining =
        event.max_participants - volunteersSignedUp.length;
      setSpotsRemaining(mathNumSpotsRemaining);
    }
  }, [event, volunteersSignedUp]);

  useEffect(() => {
    console.log();
    const fetchList = async () => {
      const documentListResponse = await fetch(
        `http://127.0.0.1:3232/events/getdocuments`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
        });
      console.log("THIS IS THE DOCUMENT LIST RESPONSE: ", documentListResponse);
      setDocumentArray(documentListResponse);
    };
    fetchList();
  }, []);

  return (
    <>
      {!!event ? (
        <>
          <div>
            <Card className={classes.root}>
              <CardContent className={classes.titleContainer}>
                <Typography className={classes.title} component="h2">
                  <Link
                    className={classes.title}
                    to={`/events/eventdetails/${event.id}`}
                  >
                    {event.title}
                  </Link>
                </Typography>
              </CardContent>
              <List component="div" disablePadding className={classes.listRoot}>
                <ListItem>
                  <ListItemText
                    className={classes.description}
                    primary={`Join us on ${moment(event.date_start).format(
                      "MMM DD, YYYY"
                    )} from 
                    ${moment(event.date_start).format("h:MM a")} to 
                    ${moment(event.date_stop).format("h:MM a")} at ${
                      event.location
                    }!`}
                  />
                </ListItem>
                <CardContent className={classes.infoContainer}>
                  <ListItem>
                    <ListItemText
                      className={classes.infoHeader}
                      primary={"DETAILS:"}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      className={classes.center}
                      primary={event.description}
                    />
                  </ListItem>
                </CardContent>
                <h3>Document(s):</h3>
                {!!eventDocsArray(event.id).length ? (
                  eventDocsArray(event.id).map((doc, index) => (
                    <a
                      href={doc.document_url}
                      target="_blank"
                      rel="noreferrer"
                      key={index}
                    >
                      {doc.document_title}
                    </a>
                  ))
                ) : (
                  <p>None</p>
                )}
                <CardContent className={classes.infoContainer}>
                  <ListItem>
                    <ListItemText
                      className={classes.infoHeader}
                      primary={"SIGN-UP DEADLINE:"}
                    />
                  </ListItem>
                  <ListItem className={classes.center}>
                    <ListItemText
                      primary={moment(event.signup_deadline).format(
                        "MMM Do YYYY"
                      )}
                    />
                  </ListItem>
                  <h4 className="m-0">You MUST signup by the deadline!</h4>
                </CardContent>
                <CardContent className={classes.infoContainer}>
                  <ListItem>
                    <ListItemText
                      className={classes.infoHeader}
                      primary={`You must be at least ${event.age_min} to participate in this event.`}
                    />
                  </ListItem>
                </CardContent>
                {!!userInfo.isLoggedIn ? (
                  <>
                    {new Date() > new Date(event.signup_deadline) ? (
                      <h3>The sign-up deadline for this event has passed.</h3>
                    ) : !volunteersSignedUp?.some(
                        (volunteer) => volunteer.volunteer_id === userInfo.id
                      ) ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={_onSignUpClick}
                          disabled={userInfo.age < event.age_min}
                        >
                          Sign Up!
                        </Button>
                        <h6
                          className={
                            userInfo.age.years < event.age_min
                              ? "f-red f-small m-0"
                              : "f-disappear f-small m-0"
                          }
                        >
                          You are not old enough to sign up for this event.
                        </h6>
                      </>
                    ) : (
                      <h3>You are already signed up for this event!</h3>
                    )}

                    <Button variant="outlined" onClick={() => history.goBack()}>
                      Back
                    </Button>
                  </>
                ) : (
                  <p>
                    Please <Link to="/login">Login</Link> to signup for this
                    event.
                  </p>
                )}
                {!!userInfo.is_admin ? (
                  <>
                    <h1>Number of Volunteers Signed up</h1>
                    <h1>
                      {volunteersSignedUp.length} signed up/
                      {event.min_participants} needed
                    </h1>
                    <h1>
                      {volunteersSignedUp.length} signed up/
                      {event.max_participants} max
                    </h1>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => history.push("/events/editevent")}
                    >
                      Edit Event
                    </Button>
                    <Route>
                      <CheckInVolunteersList event_id={id} />
                    </Route>
                  </>
                ) : (
                  <>
                    <h6>We have {spotsRemaining} more spots! Sign up today!</h6>
                  </>
                )}
              </List>
            </Card>
          </div>
        </>
      ) : (
        <h1>Event Loading.....</h1>
      )}
    </>
  );
};

export default EventDetails;
