import { AccordionActions, Button, Divider, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNTypography from '../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import VCERNTextField from '../common/elements/VCERNTextField';

import icons from '../common/icons';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AC from '../redux/actions/actionCreater';
import VCERNAlert from '../common/elements/VCERNAlert';
import constants from '../common/constants';
import PaymentModal from '../common/PaymentModal';

const useStyles = makeStyles(theme => ({
    root: { width: '100%' },
    accHeaderBox: { display: 'flex', alignItems: 'center' },
    heading: { fontWeight: 'bold' },
    orgImage: { height: 50, width: 50, borderRadius: 50, marginRight: 15 },

    input: { margin: '15px 0' },
    text: { fontWeight: 'bold', margin: '3px 0' },
    accBodyBox: { display: 'flex', flexDirection: 'column' },
}));

function AllPools({ fetchNewPoolRequests, token, respondToNewPoolRequest, type, fetchInvitations, joinPool }) {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [requests, setRequests] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [selectedInvitation, setSelectedInvitation] = useState([]);

    const isMember = type === constants.USER_TYPE_MEMBER;

    useEffect(() => {
        isMember ? fetchInvitations(token, setRequests) : fetchNewPoolRequests(token, setRequests);
    }, []);

    useEffect(() => {
        isMember
            ? setFilteredRequests(requests.filter(el => el?.pool?.name.toLowerCase().includes(search.toLowerCase())))
            : setFilteredRequests(requests.filter(el => el?.name.toLowerCase().includes(search.toLowerCase())));
    }, [search.length]);

    useEffect(() => {
        setFilteredRequests(requests);
    }, [requests.length]);

    const handleSubmit = (pool_id, response) => {
        if (isMember) {
            setShowPaymentModal(true);
            setSelectedInvitation(pool_id);
        } else {
            respondToNewPoolRequest({ response, pool_id }, token, () => {
                fetchNewPoolRequests(token, setRequests);
                setSuccessMessage(`New Pool Request ${response} Successfully`);
            });
        }
    };

    const handleConfirmPayment = () => {
        joinPool(selectedInvitation?._id, token, () => {
            fetchInvitations(token, setRequests);
            setSuccessMessage(`Joined New Pool Successfully`);
        });
        setShowPaymentModal(false);
    };

    return (
        <Grid container spacing={3}>
            <img
                src="https://d2slcw3kip6qmk.cloudfront.net/marketing/blog/2018Q4/sales-org-structure/sales-organization-team-structure-header@2x.png"
                alt="aa"
                height={300}
                width={'100%'}
            />
            <Grid container spacing={3} style={{ margin: '20px 0', alignItems: 'center' }}>
                <Grid sm={9}>
                    <VCERNTypography value="Pool Requests" variant="h4" />
                </Grid>
                <Grid sm={3}>
                    <VCERNTextField
                        icon={icons.search}
                        variant="outlined"
                        placeholder="Search Pool"
                        className={classes.input}
                        value={search}
                        onChange={evt => setSearch(evt.target.value)}
                    />
                </Grid>
            </Grid>
            <div className={classes.root}>
                {isMember
                    ? filteredRequests.map((el, idx) => (
                          <Accordion key={idx}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <div style={{ margin: 10 }}>
                                      <VCERNTypography variant="body1" className={classes.heading} value={el?.pool?.name} />
                                  </div>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accBodyBox}>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Date: <VCERNTypography variant="body2" component="span" value={el?.pool?.start_date} customColor="#6F7F9F" /> -{' '}
                                      <VCERNTypography
                                          variant="body2"
                                          component="span"
                                          value={!el?.pool?.time_limit ? 'No Time Limit' : el?.pool?.end_date}
                                          customColor="#6F7F9F"
                                      />
                                  </VCERNTypography>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Contribution: <VCERNTypography variant="body2" component="span" value={`$${el?.pool?.contribution}`} customColor="#6F7F9F" />{' '}
                                      <VCERNTypography
                                          variant="body2"
                                          component="span"
                                          value={el?.pool?.single_event ? '(Single Event)' : `(${el?.pool?.recurring_frequency})`}
                                          customColor="#6F7F9F"
                                      />
                                  </VCERNTypography>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Description: <VCERNTypography variant="body2" component="span" value={el?.pool?.description} customColor="#6F7F9F" />
                                  </VCERNTypography>
                              </AccordionDetails>
                              <Divider variant="middle" />
                              <AccordionActions>
                                  <Button color="primary" onClick={() => handleSubmit(el, 'JOIN')}>
                                      Join
                                  </Button>
                              </AccordionActions>
                          </Accordion>
                      ))
                    : filteredRequests.map((el, idx) => (
                          <Accordion key={idx}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <div className={classes.accHeaderBox}>
                                      <img src={el?.organization?.image} alt="waiting" className={classes.orgImage} />
                                      <div className={classes.accBodyBox}>
                                          <VCERNTypography variant="body1" className={classes.heading} value={el?.name} />
                                          <VCERNTypography variant="body2" className={classes.heading} value={el?.organization?.name} customColor="#6F7F9F" />
                                      </div>
                                  </div>
                              </AccordionSummary>
                              <AccordionDetails className={classes.accBodyBox}>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Date: <VCERNTypography variant="body2" component="span" value={el?.start_date} customColor="#6F7F9F" /> -{' '}
                                      <VCERNTypography variant="body2" component="span" value={!el?.time_limit ? 'No Time Limit' : el?.end_date} customColor="#6F7F9F" />
                                  </VCERNTypography>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Contribution: <VCERNTypography variant="body2" component="span" value={`$${el?.contribution}`} customColor="#6F7F9F" />{' '}
                                      <VCERNTypography
                                          variant="body2"
                                          component="span"
                                          value={el?.single_event ? '(Single Event)' : `(${el?.recurring_frequency})`}
                                          customColor="#6F7F9F"
                                      />
                                  </VCERNTypography>
                                  <VCERNTypography variant="body1" className={classes.text}>
                                      Description: <VCERNTypography variant="body2" component="span" value={el?.description} customColor="#6F7F9F" />
                                  </VCERNTypography>
                              </AccordionDetails>
                              <Divider variant="middle" />
                              <AccordionActions>
                                  <Button color="secondary" onClick={() => handleSubmit(el._id, 'REJECTED')}>
                                      Reject
                                  </Button>
                                  <Button color="primary" onClick={() => handleSubmit(el._id, 'ACCEPTED')}>
                                      Accept
                                  </Button>
                              </AccordionActions>
                          </Accordion>
                      ))}
            </div>
            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
            <PaymentModal onClose={() => setShowPaymentModal(false)} open={showPaymentModal} onConfirm={handleConfirmPayment} title="Join" />
        </Grid>
    );
}
export default connect(state => state, {
    fetchNewPoolRequests: AC.fetchNewPoolRequests,
    respondToNewPoolRequest: AC.respondToNewPoolRequest,
    fetchInvitations: AC.fetchInvitations,
    joinPool: AC.joinPool,
})(AllPools);
