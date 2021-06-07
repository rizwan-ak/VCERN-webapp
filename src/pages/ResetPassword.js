import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router';
import logo from '../common/assets/logos/blue.png';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTypography from '../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import AC from '../redux/actions/actionCreater';
import VCERNAlert from '../common/elements/VCERNAlert';
import VCERNTextField from '../common/elements/VCERNTextField';
import icons from '../common/icons';

const useStyles = makeStyles(theme => ({
    logoBox: {
        padding: '40px',
        [theme.breakpoints.down('sm')]: { padding: '40px 0', display: 'flex', justifyContent: 'center' },
    },

    root: { margin: '0 auto', width: '20vw', [theme.breakpoints.down('sm')]: { width: '85vw' } },
    logo: { height: 100, width: 100 },

    buttonBox: { display: 'flex', justifyContent: 'center', margin: '30px 0' },
    input: { margin: '40px 0' },
}));

function ResetPassword({ resetPassword, type }) {
    const classes = useStyles();
    const { token, id } = useParams();
    const history = useHistory();

    const [passwordChanged, setPasswordChanged] = useState('');
    const [password, setNewPassword] = useState('');

    const handleChange = evt => {
        setNewPassword(evt.target.value);
    };

    const handleResetPassword = () => {
        resetPassword({ token, id, password }, type, () => {
            setPasswordChanged('Password Reset Successfull.');
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        });
    };

    return (
        <div>
            <div className={classes.logoBox}>
                <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.root}>
                <VCERNTypography align="center" variant="h3" value="Reset Password" />

                <VCERNTextField type="password" label="Password" icon={icons.password} className={classes.input} value={password} name="password" onChange={handleChange} />

                <div className={classes.buttonBox}>
                    <VCERNButton fullWidth value="Change" onClick={handleResetPassword} />
                </div>
            </div>
            <VCERNAlert message={passwordChanged} onClose={() => setPasswordChanged(false)} success={true} />
        </div>
    );
}

export default connect(state => state, { resetPassword: AC.resetPassword })(ResetPassword);
