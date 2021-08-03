import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import icons from '../../common/icons';
import DashboardHeader from '../../common/DashboardHeader';
import InfoCard from '../../common/InfoCard';
import AC from '../../redux/actions/actionCreater';
import { getRoles } from '../../common/data';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', minHeight: minHeight, maxHeight: '100%' },
    title: { fontWeight: 'bold', marginTop: 10 },

    continueButton: { margin: '10px 0' },
    graphText: { fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },

    buttonBox: { width: '100%', textAlign: 'center' },
    inviteText: { fontWeight: 'bold', marginTop: 10 },
}));

function Dashboard({ selectedPool, token, type, fetchStats, fetchPoolEvents, fetchPendingMembers, currentOrganization, setCurrentPageTitle }) {
    const classes = useStyles();
    const history = useHistory();

    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Dashboard`);

        fetchStats(selectedPool?._id, type, token, setStats);
        fetchPoolEvents(selectedPool?._id, token, setEvents);
        fetchPendingMembers(currentOrganization?._id, token, setPendingMembers);

        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <DashboardHeader />
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value={`Total Members: ${stats?.number_of_members}`} />
                    <VCERNPieChart
                        data={[
                            { name: 'Pending', value: stats?.number_of_pending, color: '#FE9900' },
                            { name: 'Deceased', value: stats?.number_of_deceased, color: '#C90000' },
                            { name: 'Active', value: stats?.number_of_active, color: '#1DD1A1' },
                            { name: 'Delinquent', value: stats?.number_of_deliquent, color: '#07A7E3' },
                        ]}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Financial Reports" />
                    <VCERNPieChart
                        data={[
                            { name: 'Raised', value: stats?.total_money, color: '#07A7E3' },
                            { name: 'Delinquent', value: stats?.delinquent, color: '#035ED9' },
                            { name: 'Balance', value: stats?.current_event_money, color: '#FE9900' },
                        ]}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Waiting Pool status" />
                    <VCERNLineChart data={pendingMembers} />
                </Paper>
            </Grid>

            {!!events.length && (
                <>
                    <VCERNTypography variant="h5" className={classes.inviteText} value="Events Info" />
                    <Grid container spacing={3} style={{ margin: '20px 0' }}>
                        {events.map((el, idx) => (
                            <>{idx < 3 && <InfoCard key={idx} event={el} />}</>
                        ))}
                    </Grid>
                    <Grid container spacing={3} style={{ margin: '0 0 20px 0', justifyContent: 'center' }}>
                        <VCERNButton fullWidth startIcon={icons.eye} value="View All Events" onClick={() => history.push('/events', events)} />
                    </Grid>
                </>
            )}
        </Grid>
    );
}
export default connect(state => state, {
    fetchPoolEvents: AC.fetchPoolEvents,
    fetchStats: AC.fetchStats,
    fetchPendingMembers: AC.fetchPendingMembers,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(Dashboard);
