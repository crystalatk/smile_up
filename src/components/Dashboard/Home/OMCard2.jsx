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
          Our Mission
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.body}
        >
          SmileUp! is a 501c3 non-profit whose mission is to get kids helping
          kids through volunteerism. Our focus is on recruiting volunteers from
          all walks of life, in order to present a diverse group of SERVICE
          LEADERS who know how to work for and along side those who look and
          live differently than they do. Children instinctively focus on the
          humanity of a person and SmileUp! reinforces this character trait so
          that they carry it into adulthood. The young volunteers learn empathy,
          compassion and tolerance through their volunteer service, and by
          supporting SmileUp!, you are supporting our young volunteers in their
          efforts to make their communities and this world a better place for
          all.
        </Typography>
        <br />
        <br />
      </CardContent>
    </Card>
  );
}
