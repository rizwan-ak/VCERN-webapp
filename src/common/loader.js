import React from 'react';
import logo from './assets/logos/blue.png';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 12000,
    },
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <img alt="logo" src={logo} />
        </div>
    );
}
