import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Card from '@material-ui/core/Card';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StarBorder from "@material-ui/icons/StarBorder";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 330,
    backgroundColor: 'rgb(247, 219, 182, 1)'
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  
  

}));

const EventList = () => {
  const [eventList, setEventList] = useState();

  useEffect(() => {
    console.log();
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
      setEventList(eventListResponse);
    };
    fetchList();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <h1>This is the Event List Page</h1>
      {!!eventList ? (
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              EVENTS
            </ListSubheader>
          }
          className={classes.root}
        >
          {eventList.map((event) => {
            const startTime = event.date_start;
            console.log(startTime)
            const stopTime = event.date_stop;
            const diff = moment(stopTime) - moment(startTime);
            return (
              <div key={event.id}>
                  <>
                    <Card className={classes.root}>
                        <ListItem button onClick={handleClick}>
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <Link to={`/event/${event.id}`}>
                            <ListItemText primary={event.title} />
                          </Link>
                        </ListItem>
                          <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={'WHEN: ' + moment(startTime).format("MMM Do YYYY") + " - " + moment(stopTime).format("MMM Do YYYY")}/>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText
                                primary={'TIME: ' + moment(startTime).format("h:mm a") + " - " + moment(stopTime).format("h:mm a ")}
                              /> <br/>
                              <ListItemText secondary={'Duration:' + moment.duration(diff).hours() + 'hr ' + moment.duration(diff).minutes() + 'min'}/>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={'WHERE: ' + event.location} />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={'SIGN-UP DEADLINE: ' + moment(event.signup_deadline).format("MMM Do YYYY")}/>
                            </ListItem>
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <StarBorder />
                              </ListItemIcon>
                              <ListItemText primary={'VOLUNTEER MINIMUM AGE: ' + event.age_min}/>
                            </ListItem>
                          </List>
                    </Card>
                  
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
