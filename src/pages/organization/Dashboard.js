import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import giftPic from '../../common/assets/others/gift.png';

import VCERNGroupAvatar from '../../common/elements/VCERNGroupAvatar';

import cx from 'clsx';
import { connect } from 'react-redux';
import icons from '../../common/icons';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', minHeight: minHeight, maxHeight: '100%' },
    coverBox: { background: '#05C6BD', borderRadius: 5, height: 350, [theme.breakpoints.down('sm')]: { height: 200 } },
    coverPic: { height: '100%', width: '100%' },

    infoBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    infoPic: {
        height: 150,
        width: 150,
        borderRadius: '50%',
        border: '2px solid white',
        margin: '-60px 20px 0 30px',
        [theme.breakpoints.down('sm')]: { margin: '-50px 10px 0 10px', height: 100, width: 100 },
    },
    infoTitle: { fontWeight: 'bold', maxWidth: 320 },
    infoSettingsBox: {
        background: 'white',
        color: '6F7F9F',
        borderRadius: 5,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    hideOnSm: { [theme.breakpoints.down('sm')]: { display: 'none' } },
    inviteText: { fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
    grow: { flexGrow: 1 },

    continueButton: { margin: '10px 0' },
    deathInfoBox: { padding: theme.spacing(2), display: 'flex', alignItems: 'center', minHeight: 200, maxHeight: '100%' },
    diedPersonPic: { height: 150, width: 150 },
    diedPersonNameBox: { position: 'absolute', bottom: 10, left: 50 },

    boldText: { fontWeight: 'bold' },
    divider: { height: 1, width: '100%', background: '#EBEEFA', margin: '5px 0' },

    graphText: { fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },

    buttonBox: { width: '100%', textAlign: 'center' },
    buttonIcon: { marginRight: 15 },
}));

function Dashboard({ currentUser }) {
    const classes = useStyles();
    const history = useHistory();
    console.log(`currentUser`, currentUser);

    const { verified = '' } = currentUser;

    useEffect(() => {
        // !verified && history.push('/verify');
        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={classes.coverBox}>{/* <img src={giftPic} alt="Died Person" className={classes.coverPic} /> */}</div>
                <div className={classes.infoBox}>
                    <img src={giftPic} alt="Died Person" className={classes.infoPic} />
                    <div className={cx(classes.hideOnSm, classes.grow)}>
                        <VCERNTypography className={classes.infoTitle} variant="h5" value="Cameroonian Brotherhood Association  " />
                        <VCERNTypography className={classes.infoTitle} variant="body1" customColor="#657285" value="Tagline goes here. " />
                    </div>
                    <VCERNGroupAvatar className={cx(classes.hideOnSm)} />
                    <VCERNTypography className={cx(classes.boldText, classes.hideOnSm)} variant="body1" value="1.2K members" />
                    <div className={cx(classes.infoSettingsBox)}>{icons.settings}</div>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Total Members: 2032" />
                    <VCERNPieChart />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Financial Reports" />
                    <VCERNPieChart />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Waiting Pool status" />
                    <VCERNLineChart />
                </Paper>
            </Grid>
            <VCERNTypography variant="h5" className={classes.inviteText} value="About us" />
            <Grid container spacing={3} style={{ margin: '20px 0' }}>
                {[1, 1, 1].map(el => (
                    <Grid item xs={12} md={4}>
                        <Paper className={classes.deathInfoBox}>
                            <img src={giftPic} alt="Died Person" className={classes.diedPersonPic} />
                            {/* <div style={{ position: 'relative' }}>
                                <div className={classes.diedPersonNameBox}>s</div>
                            </div> */}
                            <div style={{ width: '100%' }}>
                                <VCERNTypography variant="body2" value="Name:" className={classes.boldText} />
                                <VCERNTypography variant="body2" value="John Doe" customColor="#6F7F9F" />
                                <div className={classes.divider} />
                                <VCERNTypography variant="body2" value="Birthday:" className={classes.boldText} />
                                <VCERNTypography variant="body2" value="20-02-1985" customColor="#6F7F9F" />
                                <div className={classes.divider} />
                                <VCERNTypography variant="body2" value="Cause of death:" className={classes.boldText} />
                                <VCERNTypography variant="body2" value="Brain Cancer" customColor="#6F7F9F" />
                            </div>
                        </Paper>
                    </Grid>
                ))}
                <div className={classes.buttonBox}>
                    <VCERNButton width={300} startIcon={icons.eye} value="View all death info" className={classes.continueButton} />
                </div>
            </Grid>
        </Grid>
    );
}
export default connect(state => state)(Dashboard);
