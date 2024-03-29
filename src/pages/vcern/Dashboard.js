import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import AC from '../../redux/actions/actionCreater';
import OrganizationsList from '../../common/OrganizationsList';
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

function Dashboard({ token, type, fetchAllStats, fetchAllPendingMembers, setCurrentPageTitle }) {
    const classes = useStyles();

    const [stats, setStats] = useState(null);
    const [pendingMembers, setPendingMembers] = useState([]);

    useEffect(() => {}, []);

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Dashboard`);
        fetchAllStats(token, setStats);
        fetchAllPendingMembers(token, setPendingMembers);

        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value={`Total Members: ${stats?.number_of_members}`} />
                    <VCERNPieChart
                        data={[
                            { name: 'Pending', value: stats?.number_of_pending, color: '#FE9900' },
                            { name: 'Deceased', value: stats?.number_of_deceased, color: '#C90000' },
                            { name: 'Active', value: stats?.number_of_active, color: '#1DD1A1' },
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
            <Grid item xs={12}>
                <OrganizationsList />
            </Grid>
        </Grid>
    );
}
export default connect(state => state, { fetchAllStats: AC.fetchAllStats, fetchAllPendingMembers: AC.fetchAllPendingMembers, setCurrentPageTitle: AC.setCurrentPageTitle })(
    Dashboard,
);
