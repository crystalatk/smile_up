import React from 'react';
import { makeStyles } from '@material-ui/styles';
import OMCard from './OMCard';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    }

}));

export default function () {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <OMCard />
        </div>
    )
}