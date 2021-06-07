import { Grid, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import logo from '../common/assets/logos/blue.png';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTypography from '../common/elements/VCERNTypography';

import verifyPic from '../common/assets/others/verify.png';

import VCERNTextField from '../common/elements/VCERNTextField';
import VCERNAlert from '../common/elements/VCERNAlert';

import AC from '../redux/actions/actionCreater';
import { connect } from 'react-redux';
import constants from '../common/constants';
import icons from '../common/icons';

const useStyles = makeStyles(theme => ({
    main: { display: 'flex', flexDirection: 'column', height: '100vh' },
    logoBox: { padding: '40px', [theme.breakpoints.down('sm')]: { padding: '40px 0', display: 'flex', justifyContent: 'center' } },
    root: { margin: '0 auto', flexGrow: 2, width: '60vw', display: 'flex', alignItems: 'center', [theme.breakpoints.down('sm')]: { width: '85vw' } },
    logo: { height: 100, width: 100 },
    rightBox: { padding: 30 },
    input: { margin: '30px 0' },
    text: { margin: '20px 0' },
}));

function ForgotPassword({ forgotPassword, type }) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [emailSendMessage, setEmailSendMessage] = useState('');
    const [disableButton, setDisableButton] = useState(false);

    const handleSubmit = () => {
        forgotPassword(email, type, () => {
            setEmailSendMessage('Email Sent successfully.');
            setDisableButton(true);
        });
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
                            <VCERNTypography className={classes.text} align="center" variant="h4" value="Forgot Password" />
                            <VCERNTypography className={classes.text} align="center" variant="h5" value="Get verified, Stay safe!" />
                            <VCERNTypography
                                className={classes.text}
                                align="center"
                                variant="body1"
                                value="Enter the email Address or Phone number associated with your accout We will send you a 4 digit code to reset your password."
                            />

                            <VCERNTextField label="Email" icon={icons.email} className={classes.input} value={email} name="email" onChange={evt => setEmail(evt.target.value)} />

                            <VCERNButton fullWidth value="Send" onClick={handleSubmit} disabled={disableButton || !constants.EMAIL_REGEX.test(email)} />
                        </div>
                    </Grid>
                </Grid>
            </div>

            <VCERNAlert message={emailSendMessage} onClose={() => setEmailSendMessage(false)} success={true} />
        </div>
    );
}

export default connect(state => state, { forgotPassword: AC.forgotPassword })(ForgotPassword);
