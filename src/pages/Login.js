import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import loginPic from '../common/assets/backgrounds/login.png';
import logo from '../common/assets/logos/blue.png';

import VCERNTypography from '../common/elements/VCERNTypography';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTextField from '../common/elements/VCERNTextField';

import { Checkbox, Grid, Paper } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import AC from '../redux/actions/actionCreater';
import constants from '../common/constants';
import icons from '../common/icons';

const useStyles = makeStyles(theme => ({
    root: { height: '100vh' },
    image: { backgroundImage: `url(${loginPic})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' },
    overlay: { height: '100%', width: '100%', backgroundColor: '#16263D', opacity: 0.5 },
    paper: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    container: {
        width: 420,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: 300,
            justifyContent: 'space-between',
        },
    },

    logo: { height: 100, width: 100, alignSelf: 'center' },
    logoText: { padding: '30px 0' },
    inline: { display: 'flex', justifyContent: 'space-between', width: '100%' },

    input: { margin: '15px 0' },
    remberMeContainer: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' },
    underline: { textDecoration: 'underline', fontWeight: 'bold', margin: '20px 0', cursor: 'pointer' },
}));

function Landing({ login, type, token, setUserType }) {
    const classes = useStyles();
    const history = useHistory();

    const [state, setState] = useState({ email: '', password: '', rememberMe: false });
    const { email, password, rememberMe } = state;

    const handleChange = evt => {
        const { value, name } = evt.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = () => {
        login(state, type, () => history.push('/dashboard'));
    };

    useEffect(() => {
        history.location.pathname.split('/')[1] === 'vcern-admin' && setUserType(constants.USER_TYPE_VCERN);
    }, [history, setUserType]);

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={false} sm={4} md={6} className={classes.image}>
                <div className={classes.overlay} />
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} className={classes.paper}>
                <div className={classes.container}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <VCERNTypography align="center" variant="h4" className={classes.logoText} value="Sign In" />

                    <VCERNTextField label="Email or Username" icon={icons.email} className={classes.input} value={email} name="email" onChange={handleChange} />

                    <VCERNTextField type="password" label="Password" icon={icons.password} className={classes.input} value={password} name="password" onChange={handleChange} />

                    <div className={classes.remberMeContainer}>
                        <Checkbox color="secondary" value={rememberMe} checked={rememberMe} onChange={evt => setState({ ...state, rememberMe: evt.target.checked })} />
                        <VCERNTypography align="right" variant="body1" className={classes.underline} value="Remember Me!" />
                    </div>

                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleSubmit} />

                    <VCERNTypography
                        align="right"
                        variant="body1"
                        color="secondary"
                        className={classes.underline}
                        value="Forgot Password ?"
                        onClick={() => history.push('/forgot-password')}
                    />

                    {!(type === constants.USER_TYPE_VCERN) && (
                        <VCERNTypography align="center" variant="body1">
                            Don’t have an account yet?{' '}
                            <VCERNTypography
                                component="span"
                                variant="body1"
                                color="secondary"
                                className={classes.underline}
                                value="REGISTER"
                                onClick={() => history.push('/register')}
                            />
                        </VCERNTypography>
                    )}
                </div>
            </Grid>
        </Grid>
    );
}
export default connect(state => state, { login: AC.login, setError: AC.setError, setUserType: AC.setUserType })(Landing);
