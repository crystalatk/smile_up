import React from 'react';
import { makeStyles } from '@material-ui/styles';
import OMCard from './OMCard';
import OMCard2 from './OMCard2';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around'

    }

}));

export default function () {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <OMCard />
            <OMCard2 />
        </div>
    )
}