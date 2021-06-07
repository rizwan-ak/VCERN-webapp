import { Divider, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import giftPic from '../../common/assets/others/gift.png';
import waitingPic from '../../common/assets/others/dashboard-waiting.jpg';
import contributePic from '../../common/assets/others/contribute.png';
import payoutPic from '../../common/assets/others/payout.png';

const minHeight = 300;
const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', overflow: 'auto', minHeight: minHeight, maxHeight: '100%' },
    waitingPic: { height: 400, maxWidth: '98%', [theme.breakpoints.down('sm')]: { height: 280 } },

    innerBox: { padding: '40px 50px', [theme.breakpoints.down('sm')]: { padding: 0 } },
    text: { margin: '30px 0', color: 'white' },
    infoText: { cursor: 'pointer', textDecoration: 'underline' },

    hideOnSm: { [theme.breakpoints.down('sm')]: { display: 'none' } },

    contributeBox: { display: 'flex', justifyContent: 'center', alignitems: 'center', borderBottom: '1px solid #BFC2D6', width: '100%', paddingBottom: 20 },
    icon: { height: 50, width: 50, marginRight: 20 },

    inviteBox: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: minHeight, maxHeight: '100%' },
    invitePic: { height: 90, width: 90 },
    inviteText: { fontWeight: 'bold', marginTop: 10, textAlign: 'center' },

    continueButton: { margin: '10px 0' },
}));

export default function PaymentAgreements() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{ background: '#0191DA' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4} className={classes.hideOnSm}>
                            <Paper className={classes.paper}>
                                <img src={waitingPic} alt="waiting" className={classes.waitingPic} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={8}>
                            {/* <VCERNTypography className={classes.infoText} variant="body1" color="secondary" align="right" value="What is this?" /> */}
                            <div className={classes.innerBox}>
                                <VCERNTypography className={classes.text} variant="h4" align="center" value="Hey! You’re in the waiting pool now!" />
                                <VCERNTypography className={classes.text} variant="h5" align="center">
                                    Profile status:
                                    <VCERNTypography color="secondary" value=" Pending" />
                                </VCERNTypography>
                                <VCERNTypography className={classes.text} variant="h5" align="center" value="23 days remaining to unlock!" />
                                <LinearProgress variant="determinate" color="secondary" value={70} />
                                <VCERNTypography className={classes.text} variant="body2" align="center">
                                    <VCERNTypography color="secondary" value="67 of " />
                                    90 days completed
                                </VCERNTypography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <iframe title="video" width="100%" height="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY" />
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    {/* asdasdfasdfasd fasdf asdf asdf asdf asdf */}
                    {/* <VCERNLineChart /> */}
                    <VCERNPieChart />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.inviteBox}>
                    <div className={classes.contributeBox}>
                        <img src={contributePic} alt="contribute" className={classes.icon} />
                        <div>
                            <VCERNTypography variant="body1" className={classes.inviteText} value="Contribution: $20" />
                            <VCERNTypography variant="body2" className={classes.inviteText} value="I’ll donate each time" customColor="#6F7F9F" />
                        </div>
                    </div>
                    <div className={classes.contributeBox} style={{ borderBottom: 0, marginTop: 20 }}>
                        <img src={payoutPic} alt="contribute" className={classes.icon} />
                        <div>
                            <VCERNTypography variant="body1" className={classes.inviteText} value="Payout: $20,000" />
                            <VCERNTypography variant="body2" className={classes.inviteText} value="I’ll receive" customColor="#6F7F9F" />
                        </div>
                    </div>

                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} />
                    <Divider />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper className={classes.inviteBox}>
                    <img src={giftPic} alt="invite" className={classes.invitePic} />
                    <VCERNTypography className={classes.inviteText} variant="h5" value="Get $10" />
                    <VCERNTypography className={classes.inviteText} variant="body2" value="You’ll both get $10 in free When your friend Join in the pool" customColor="#6F7F9F" />
                    <VCERNTypography className={classes.inviteText} variant="body1" value="Help your pool grow faster by inviting family and friends!" />
                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} />
                </Paper>
            </Grid>
            <VCERNTypography variant="h5" className={classes.inviteText} value="About us" />
            <Grid container spacing={3} style={{ margin: '20px 0' }}>
                <Grid item xs={12} md={4}>
                    <img src={waitingPic} alt="waiting" height={375} width="auto" />
                </Grid>
                <Grid item xs={12} md={8}>
                    <VCERNTypography
                        variant="body1"
                        customColor="#6F7F9F"
                        value="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    />
                    <VCERNTypography variant="body1" className={classes.inviteText} value="Read More" />
                </Grid>
            </Grid>
        </Grid>
    );
}
