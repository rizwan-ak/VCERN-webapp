import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import VCERNAvatar from './elements/VCERNAvatar';
import docsImage from './assets/others/docsImage.png';

const useStyles = makeStyles(theme => ({
    docImage: { width: 125, height: 112.7 },
    link: { display: 'contents' },
}));

export default function DocumentsList({ docs }) {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            {docs.map((el, idx) => (
                <Grid item key={idx} sm={6} md={3} lg={2}>
                    <a className={classes.link} href={el?.file} target="_blank" rel="noreferrer" download>
                        <VCERNAvatar className={classes.docImage} variant="rounded" src={el?.type === 'image' ? el?.file : docsImage} />
                    </a>
                </Grid>
            ))}
        </Grid>
    );
}
