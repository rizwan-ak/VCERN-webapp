import React, { useEffect } from 'react';
import { Divider, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import giftPic from '../../common/assets/others/gift.png';
import waitingPic from '../../common/assets/others/dashboard-waiting.png';
import contributePic from '../../common/assets/others/contribute.png';
import payoutPic from '../../common/assets/others/payout.png';
import { connect } from 'react-redux';
import AC from '../../redux/actions/actionCreater';
import { useState } from 'react';
import icons from '../../common/icons';
import { useHistory } from 'react-router-dom';
import InfoCard from '../../common/InfoCard';
import BlogCard from '../../common/BlogCard';
import { getRoles } from '../../common/data';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', minHeight: minHeight, maxHeight: '100%' },
    waitingPic: { height: 300, maxWidth: '98%' },

    // innerBox: { padding: '40px 50px', [theme.breakpoints.down('sm')]: { padding: 0 } },
    innerBox: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
    text: { margin: '20px 0', fontWeight: 'bold' },
    infoText: { cursor: 'pointer', textDecoration: 'underline' },

    hideOnSm: { [theme.breakpoints.down('sm')]: { display: 'none' } },

    contributeBox: { display: 'flex', justifyContent: 'center', alignitems: 'center', borderBottom: '1px solid #BFC2D6', width: '100%', paddingBottom: 20 },
    icon: { height: 50, width: 50, marginRight: 20 },

    inviteBox: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: minHeight, maxHeight: '100%' },
    invitePic: { height: 90, width: 90 },
    inviteText: { fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
    graphText: { fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },

    continueButton: { margin: '10px 0' },
    aboutPic: { height: 375, width: '100%' },
    aboutBody: { overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', '-webkit-line-clamp': 15, '-webkit-box-orient': 'vertical' },
}));

function Dashboard({ type, token, fetchStats, selectedPool, fetchPoolEvents, currentOrganization, fetchBlogs, currentUser, setCurrentPageTitle }) {
    const classes = useStyles();
    const history = useHistory();

    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const { about_image, description } = currentOrganization;
    const { status } = currentUser;

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Dashboard`);

        fetchStats(selectedPool?._id, type, token, setStats);
        fetchPoolEvents(selectedPool?._id, token, setEvents);
        fetchBlogs(token, setBlogs);

        // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                {status === 'active' ? (
                    <VCERNTypography className={classes.text} variant="h5" align="center">
                        Profile status:
                        <VCERNTypography customColor="#05BD6A" value=" Active" />
                    </VCERNTypography>
                ) : (
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={3} lg={3} className={classes.hideOnSm}>
                                <img src={waitingPic} alt="waiting" className={classes.waitingPic} />
                            </Grid>
                            <Grid item xs={12} md={8} lg={8} className={classes.innerBox}>
                                {/* <VCERNTypography className={classes.infoText} variant="body1" color="secondary" align="right" value="What is this?" /> */}
                                <div>
                                    <VCERNTypography className={classes.text} variant="h4" align="center" value="Hey! You’re in the waiting pool now!" />
                                    <VCERNTypography className={classes.text} variant="h5" align="center">
                                        Profile status:
                                        <VCERNTypography color="secondary" value=" Pending" />
                                    </VCERNTypography>
                                    <VCERNTypography className={classes.text} variant="h6" align="center" value="23 days remaining to unlock!" />
                                    <LinearProgress variant="determinate" color="secondary" value={70} />
                                    <VCERNTypography className={classes.text} variant="body2" align="center">
                                        <VCERNTypography color="secondary" value="67 of " />
                                        90 days completed
                                    </VCERNTypography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <iframe title="video" width="100%" height="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
            </Grid>
            <Grid item xs={12} md={6}>
                {status === 'active' ? (
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
                ) : (
                    <Paper className={classes.inviteBox}>
                        <VCERNTypography className={classes.inviteText} variant="h5" value="Verification" />
                        <VCERNTypography variant="body1" value="Upload requirement documents to" />
                        <VCERNTypography variant="body1" value="activate you membership after the 3" />
                        <VCERNTypography variant="body1" value="months waiting period." />
                        <VCERNButton fullWidth value="Upload" startIcon={icons.save} className={classes.continueButton} style={{ marginTop: 20 }} />
                    </Paper>
                )}
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.inviteBox}>
                    <div className={classes.contributeBox}>
                        <img src={contributePic} alt="contribute" className={classes.icon} />
                        <div>
                            <VCERNTypography variant="body1" className={classes.inviteText} value={`Contribution: $${stats?.contribution}`} />
                            <VCERNTypography variant="body2" className={classes.inviteText} value="I’ll donate each time" customColor="#6F7F9F" />
                        </div>
                    </div>
                    <div className={classes.contributeBox} style={{ borderBottom: 0, marginTop: 20 }}>
                        <img src={payoutPic} alt="contribute" className={classes.icon} />
                        <div>
                            <VCERNTypography variant="body1" className={classes.inviteText} value={`Payout: $${stats?.payout}`} />
                            <VCERNTypography variant="body2" className={classes.inviteText} value="I’ll receive" customColor="#6F7F9F" />
                        </div>
                    </div>

                    <VCERNButton fullWidth startIcon={icons.payment} value="My Payment History" className={classes.continueButton} onClick={() => history.push('/payments')} />
                    <Divider />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.inviteBox}>
                    <img src={giftPic} alt="invite" className={classes.invitePic} />
                    <VCERNTypography className={classes.inviteText} variant="h5" value="Get $10" />
                    <VCERNTypography className={classes.inviteText} variant="body2" value="You’ll both get $10 in free When your friend Join in the pool" customColor="#6F7F9F" />
                    <VCERNTypography className={classes.inviteText} variant="body1" value="Help your pool grow faster by inviting family and friends!" />
                    <VCERNButton fullWidth value="Invite" startIcon={icons.invite} className={classes.continueButton} />
                </Paper>
            </Grid>

            {!!events.length && status === 'active' && (
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

            {!!blogs.length && (
                <>
                    <VCERNTypography variant="h5" className={classes.inviteText} value="Blog / Articles" />
                    <Grid container spacing={3} style={{ margin: '20px 0' }}>
                        {blogs.map((el, idx) => (
                            <>
                                {idx < 3 && (
                                    <Grid item key={idx} xs={12} md={4} lg={4}>
                                        <BlogCard blog={el} />
                                    </Grid>
                                )}
                            </>
                        ))}
                    </Grid>
                    <Grid container spacing={3} style={{ margin: '0 0 20px 0', justifyContent: 'center' }}>
                        <VCERNButton fullWidth startIcon={icons.eye} value="View All Blogs" onClick={() => history.push('/blogs')} />
                    </Grid>
                </>
            )}

            <VCERNTypography variant="h5" component="h5" className={classes.inviteText} value="About us" />
            <Grid container spacing={3} style={{ margin: '20px 0' }}>
                <Grid item xs={12} md={4}>
                    <img src={about_image} alt="waiting" className={classes.aboutPic} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <VCERNTypography variant="body1" customColor="#6F7F9F" value={description} className={classes.aboutBody} />
                </Grid>
            </Grid>
        </Grid>
    );
}
export default connect(state => state, { fetchStats: AC.fetchStats, fetchPoolEvents: AC.fetchPoolEvents, fetchBlogs: AC.fetchBlogs, setCurrentPageTitle: AC.setCurrentPageTitle })(
    Dashboard,
);
