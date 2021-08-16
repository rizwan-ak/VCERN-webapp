import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../common/assets/logos/blue.png';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTypography from '../common/elements/VCERNTypography';

import verifyPic from '../common/assets/others/verify.png';

import VCERNAlert from '../common/elements/VCERNAlert';

import AC from '../redux/actions/actionCreater';
import { connect } from 'react-redux';
import PinInput from 'react-pin-input';

const useStyles = makeStyles(theme => ({
    main: { display: 'flex', flexDirection: 'column', height: '100vh' },
    logoBox: { padding: '40px', [theme.breakpoints.down('sm')]: { padding: '40px 0', display: 'flex', justifyContent: 'center' } },
    root: { margin: '0 auto', flexGrow: 2, width: '60vw', display: 'flex', alignItems: 'center', [theme.breakpoints.down('sm')]: { width: '85vw' } },
    logo: { height: 100, width: 100 },
    rightBox: { padding: '0 30px', textAlign: 'center' },
    text: { margin: '20px 0' },
    underlined: { textDecoration: 'underline', cursor: 'pointer' },
}));

function Verify({ sendVerificationCode, verify, type, token }) {
    const classes = useStyles();
    const history = useHistory();

    const [code, setCode] = useState('');
    const [emailSendMessage, setEmailSendMessage] = useState('');

    useEffect(() => {
        handleResend();
        // eslint-disable-next-line
    }, []);

    const handleResend = () => {
        sendVerificationCode(token, type, () => {
            setEmailSendMessage('Email Resent Successfully.');
        });
    };

    const handleSubmit = () => {
        verify({ code, token }, type, () => history.push('/dashboard'));
    };

    return (
        <div className={classes.main}>
            <div className={classes.logoBox}>
                <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <img src={verifyPic} alt="waiting" width="100%" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <div className={classes.rightBox}>
                            <VCERNTypography className={classes.text} variant="h4" value="Verification" />

                            <VCERNTypography className={classes.text} variant="body1" value="Check your email for the verification code we just sent you and enter it below.... " />

                            <PinInput focus length={4} type="numeric" onChange={val => setCode(val)} style={{ margin: '30px 0' }} />

                            <VCERNTypography variant="body1">
                                Didn’t received a code?{' '}
                                <VCERNTypography color="secondary" variant="body1" component="span" value=" Resend" className={classes.underlined} onClick={handleResend} />
                            </VCERNTypography>

                            <VCERNButton className={classes.text} fullWidth value="Send" onClick={handleSubmit} disabled={!(code.length > 3)} />
                        </div>
                    </Grid>
                </Grid>
            </div>

            <VCERNAlert message={emailSendMessage} onClose={() => setEmailSendMessage(false)} success={true} />
        </div>
    );
}

export default connect(state => state, { verify: AC.verify, sendVerificationCode: AC.sendVerificationCode })(Verify);
