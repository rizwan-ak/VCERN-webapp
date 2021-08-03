import { Divider, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import AC from '../../redux/actions/actionCreater';
import MonthsSlider from '../../common/MonthsSlider';
import VCERNAvatar from '../../common/elements/VCERNAvatar';
import { getFormattedDate, getYear } from '../../common/helper';
import constants from '../../common/constants';
import { getRoles } from '../../common/data';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', minHeight: minHeight, maxHeight: '100%' },
    graphText: { fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },

    sliderBox: { margin: '50px 30px 30px 30px' },
    listBox: { display: 'flex', alignItems: 'center' },
    pic: { height: 60, width: 60, marginRight: 25 },
    reasonText: { background: '#FFEDEE', color: '#FE4A54', borderRadius: 10, padding: '2px 5px' },
    grow: { flexGrow: 1 },
    divider: { margin: '15px 0' },
    boldText: { fontWeight: 'bold' },
}));

function Payments({ selectedPool, token, type, fetchStats, fetchOrganizationsPayments, currentOrganization, setCurrentPageTitle }) {
    const classes = useStyles();

    const [stats, setStats] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(0);
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Payments`);
        fetchStats(selectedPool?._id, type === constants.USER_TYPE_VCERN ? constants.USER_TYPE_ORG : type, token, setStats);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchOrganizationsPayments(currentOrganization?._id, currentMonth, getYear(currentMonth), token, setPaymentHistory);

        // eslint-disable-next-line
    }, [currentMonth]);

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
                            { name: 'Delinquent', value: stats?.number_of_deliquent, color: '#07A7E3' },
                        ]}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <VCERNTypography variant="body1" className={classes.graphText} value="Financial Report" />
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
                <div className={classes.sliderBox}>
                    <MonthsSlider currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
                </div>
            </Grid>
            <Grid item xs={12}>
                {paymentHistory.map(({ amount, payed_by_name, payed_by_image, date, type }, idx) => (
                    <div key={idx}>
                        <div className={classes.listBox}>
                            <VCERNAvatar className={classes.pic} src={payed_by_image} />
                            <div className={classes.grow}>
                                <VCERNTypography variant="body1" value={payed_by_name} className={classes.boldText} />
                                <VCERNTypography variant="body2" value={getFormattedDate(date)} />
                                <VCERNTypography variant="caption" value={type === 'EVENT_PAYMENT' ? 'Contribution' : 'Membership Fee'} className={classes.reasonText} />
                            </div>
                            <VCERNTypography variant="body1" value={`$${amount}`} className={classes.boldText} />
                        </div>
                        <Divider variant="fullWidth" className={classes.divider} />
                    </div>
                ))}
            </Grid>
        </Grid>
    );
}
export default connect(state => state, { fetchStats: AC.fetchStats, fetchOrganizationsPayments: AC.fetchOrganizationsPayments, setCurrentPageTitle: AC.setCurrentPageTitle })(
    Payments,
);
