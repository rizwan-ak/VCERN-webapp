import { Grid, Paper, makeStyles } from '@material-ui/core';
import React from 'react';
import VCERNTypography from './elements/VCERNTypography';
import { getFormattedDate, getYearsfromNow } from './helper';

const useStyles = makeStyles(theme => ({
    root: { padding: theme.spacing(2), display: 'flex', alignItems: 'center' },

    imgBox: { position: 'relative' },
    diedPersonPic: { height: 150, width: 150, marginRight: 15 },
    diedPersonNameBox: {
        position: 'absolute',
        bottom: 5,
        width: 150,
        height: 60,
        paddingTop: 10,
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(18,41,77,0.8))`,
    },
    detailsBox: { width: '100%' },

    boldText: { fontWeight: 'bold' },
    divider: { height: 1, width: '100%', background: '#EBEEFA', margin: '5px 0' },
}));

export default function InfoCard({ event }) {
    const classes = useStyles();
    const { complete, date, description, title, member_id } = event;
    const { first_name, last_name, dob, image } = member_id;

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.root}>
                <div className={classes.imgBox}>
                    <img src={image} alt="Died Person" className={classes.diedPersonPic} />
                    <div className={classes.diedPersonNameBox}>
                        <VCERNTypography variant="body1" align="center" value={`${first_name} ${last_name}`} customColor="#fff" className={classes.boldText} />
                        <VCERNTypography variant="body2" align="center" value={`Was ${getYearsfromNow(dob)} Y. old`} customColor="#fff" />
                    </div>
                </div>
                <div className={classes.detailsBox}>
                    <VCERNTypography variant="body2" value="Date of Death:" className={classes.boldText} />
                    <VCERNTypography variant="body2" value={getFormattedDate(date)} customColor="#6F7F9F" />
                    <div className={classes.divider} />
                    <VCERNTypography variant="body2" value="Place of Death:" className={classes.boldText} />
                    <VCERNTypography variant="body2" value={description} customColor="#6F7F9F" />
                    <div className={classes.divider} />
                    <VCERNTypography variant="body2" value="Cause of Death:" className={classes.boldText} />
                    <VCERNTypography variant="body2" value={title} customColor="#6F7F9F" />
                </div>
            </Paper>
        </Grid>
    );
}
