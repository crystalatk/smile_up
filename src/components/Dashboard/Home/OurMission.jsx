import React from "react";
import { makeStyles } from "@material-ui/styles";
import OMCard from "./OMCard";
import OMCard2 from "./OMCard2";

const useStyles = makeStyles((theme) => ({

    root: {
        backgroundColor: ' rgb(0, 214, 203, 0.85)',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 'auto',
        maxWidth: '1000px',
        padding: '25px',

    }

}));

const OurMission = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <OMCard />
      <OMCard2 />
    </div>
  );
}

export default OurMission;