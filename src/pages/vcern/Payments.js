import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

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

function Dashboard({ token, fetchAllStats, fetchPoolStats, fetchOrganizationStats, setCurrentPageTitle, type }) {
    const classes = useStyles();

    const [stats, setStats] = useState(null);
    const [poolStats, setPoolStats] = useState(null);
    const [organizationStats, setOrganizationStats] = useState(null);

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Payments`);
        fetchAllStats(token, setStats);
        fetchPoolStats(token, setPoolStats);
        fetchOrganizationStats(token, setOrganizationStats);

        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Organizations Report" />
                    <VCERNPieChart
                        data={[
                            { name: 'Active', value: organizationStats?.number_of_active, color: '#1DD1A1' },
                            { name: 'Inactive', value: organizationStats?.number_of_inactive, color: '#C90000' },
                        ]}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Financial Report" />
                    <VCERNPieChart
                        data={[
                            { name: 'Raised', value: stats?.total_money, color: '#07A7E3' },
                            { name: 'Delinquent', value: stats?.delinquent, color: '#C90000' },
                            { name: 'Memership Fee', value: stats?.membership_fee, color: '#1DD1A1' },
                            { name: 'Organization Fee', value: stats?.organization_fee, color: '#FE9900' },
                        ]}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Pools Report" />
                    <VCERNPieChart
                        data={[
                            { name: 'Death Pool', value: poolStats?.number_of_death_pools, color: '#C90000' },
                            { name: 'Single Event', value: poolStats?.number_of_single_event_pools, color: '#07A7E3' },
                            { name: 'Recurring', value: poolStats?.number_of_recurring_pools, color: '#1DD1A1' },
                        ]}
                    />
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <OrganizationsList goToOrg />
            </Grid>
        </Grid>
    );
}
export default connect(state => state, {
    fetchAllStats: AC.fetchAllStats,
    fetchAllPendingMembers: AC.fetchAllPendingMembers,
    fetchPoolStats: AC.fetchPoolStats,
    fetchOrganizationStats: AC.fetchOrganizationStats,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(Dashboard);
