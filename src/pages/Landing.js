import { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import loginPic from '../common/assets/backgrounds/login.png';
import logo from '../common/assets/logos/blue-with-text.png';

import VCERNTypography from '../common/elements/VCERNTypography';
import VCERNButton from '../common/elements/VCERNButton';

import { Grid, Paper } from '@material-ui/core';
import { Check } from '../common/icons';

import { useHistory } from 'react-router-dom';
import cx from 'clsx';

import AC from '../redux/actions/actionCreater';

import constants from '../common/constants';

const useStyles = makeStyles(theme => ({
    root: { height: '100vh' },
    image: { backgroundImage: `url(${loginPic})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' },
    overlay: { height: '100%', width: '100%', backgroundColor: '#16263D', opacity: 0.5 },
    paper: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
    container: {
        width: 420,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 300,
            justifyContent: 'space-between',
        },
    },

    logo: { height: 150, width: 300 },
    logoText: { padding: '10px 0 40px 0' },
    title: { padding: '30px 0' },

    borderedButton: { border: '1px solid #07A7E3' },
    tickIcon: { fontSize: 10, marginRight: 10, padding: 0, border: '3px solid #07A7E3', borderRadius: 50, fontWeight: 'bold', color: 'white' },
    activeTickIcon: { fontSize: 12, marginRight: 10, padding: 3, backgroundColor: '#07A7E3', borderRadius: 50, fontWeight: 'bold', color: 'white' },
    continueButton: { marginTop: 30 },
    inline: { display: 'flex', justifyContent: 'space-between', width: '100%' },
}));

function Landing({ setUserType }) {
    const classes = useStyles();
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(true);
    const [isMember, setIsMember] = useState(true);

    const handleSubmit = () => {
        setUserType(isMember ? constants.USER_TYPE_MEMBER : constants.USER_TYPE_ORG);
        history.push(isLogin ? '/login' : '/register');
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={6} component={Paper} className={classes.paper}>
                <div className={classes.container}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <VCERNTypography align="center" variant="h5" color="secondary" className={classes.logoText} value="The Best Alternative to Life Insurance." />
                    <VCERNTypography align="center" variant="h6" className={classes.title} value="Login/Register?" />

                    <div className={classes.inline}>
                        <div style={{ width: '46%' }}>
                            <VCERNButton fullWidth variant="outlined" className={cx({ [classes.borderedButton]: isLogin })} onClick={() => setIsLogin(true)}>
                                <Check className={isLogin ? classes.activeTickIcon : classes.tickIcon} />
                                Login
                            </VCERNButton>
                        </div>
                        <div style={{ width: '46%' }}>
                            <VCERNButton fullWidth variant="outlined" className={cx({ [classes.borderedButton]: !isLogin })} onClick={() => setIsLogin(false)}>
                                <Check className={!isLogin ? classes.activeTickIcon : classes.tickIcon} />
                                Register
                            </VCERNButton>
                        </div>
                    </div>

                    <VCERNTypography align="center" variant="h6" className={classes.title} value="Select User Type" />

                    <div className={classes.inline}>
                        <div style={{ width: '46%' }}>
                            <VCERNButton fullWidth variant="outlined" className={cx({ [classes.borderedButton]: isMember })} onClick={() => setIsMember(true)}>
                                <Check className={isMember ? classes.activeTickIcon : classes.tickIcon} />
                                Member
                            </VCERNButton>
                        </div>
                        <div style={{ width: '46%' }}>
                            <VCERNButton fullWidth variant="outlined" className={cx({ [classes.borderedButton]: !isMember })} onClick={() => setIsMember(false)}>
                                <Check className={!isMember ? classes.activeTickIcon : classes.tickIcon} />
                                Organization
                            </VCERNButton>
                        </div>
                    </div>
                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleSubmit} />
                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={6} className={classes.image}>
                <div className={classes.overlay} />
            </Grid>
        </Grid>
    );
}
export default connect(state => state, { setUserType: AC.setUserType })(Landing);
