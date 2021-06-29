import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import giftPic from '../../common/assets/others/gift.png';

import VCERNGroupAvatar from '../../common/elements/VCERNGroupAvatar';

import { connect } from 'react-redux';
import icons from '../../common/icons';
import DashboardHeader from '../../common/DashboardHeader';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', minHeight: minHeight, maxHeight: '100%' },
    inviteText: { fontWeight: 'bold', marginTop: 10, textAlign: 'center' },

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

function Dashboard({}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container spacing={3}>
            <DashboardHeader />
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
