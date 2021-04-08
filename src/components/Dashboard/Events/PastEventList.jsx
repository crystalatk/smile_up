import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(247, 219, 182, 1)",
    border: "1px solid rgb(251, 247, 243, 0.85)",
    float: "none",
    margin: "2em auto",
    maxWidth: 330,
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
}));

const EventList = () => {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    console.log();
    const fetchList = async () => {
      const eventListResponse = await fetch(
        `http://127.0.0.1:3232/events/pastlist`,
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
      setEventList(eventListResponse);
    };
    fetchList();
  }, []);

  const classes = useStyles();

  return (
    <>
      {!!eventList ? (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              className={classes.subheader}
              component="div"
              id="nested-list-subheader"
            >
              Some of the smiles we've given...
            </ListSubheader>
          }
        >
          {eventList.map((event) => {
            const startTime = event.date_start;
            console.log(startTime);
            const stopTime = event.date_stop;

            return (
              <div key={event.id}>
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
                      <List
                        component="div"
                        disablePadding
                        className={classes.listRoot}
                      >
                        <ListItem>
                          <ListItemIcon>
                            <EventIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={moment(startTime).format("MMM Do YYYY")}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AccessTimeIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              moment(startTime).format("h:mm a") +
                              " - " +
                              moment(stopTime).format("h:mm a ")
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocationOnIcon />
                          </ListItemIcon>
                          <ListItemText primary={event.location} />
                        </ListItem>
                      </List>
                    </Card>
                  </div>
                </>
              </div>
            );
          })}
        </List>
      ) : (
        // </>
        <>
          <h1>No Upcoming Events.</h1>
          <h3>Please check back later</h3>
        </>
      )}
    </>
  );
};

export default EventList;
