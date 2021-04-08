import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 645,
    background: 'rgba(0,0,0,0.7)',
    backgroundHeight: '100'

  },
  media: {
    height: 465,
  },
  title: {
    fontFamily: "Simplifica",
    fontWeight: "bold",
    color: "white",
    fontSize: "1.9rem",
  },

  body: {
    color: "white",
    fontSize: "1.2em",
  },
});

export default function OMCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={process.env.PUBLIC_URL + "./images/s4.jpg"}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          Who We Are
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.body}
        >
          We envision a world where young people are leading the charge in
          volunteerism through awareness, advocacy and action. Our mission is to
          be a conduit through which they can accomplish this.
        </Typography>
      </CardContent>
    </Card>
  );
}
