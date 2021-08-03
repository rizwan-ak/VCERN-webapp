import { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import bgPic from '../../common/assets/backgrounds/register.png';
import logo from '../../common/assets/logos/blue-with-text.png';

import VCERNTypography from '../../common/elements/VCERNTypography';
import VCERNButton from '../../common/elements/VCERNButton';
import VCERNTextField from '../../common/elements/VCERNTextField';

import { Checkbox, Grid, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import AC from '../../redux/actions/actionCreater';
import { organizationSteps, statesList, citiesList } from '../../common/data';
import VCERNAutocomplete from '../../common/elements/VCERNAutocomplete';
import constants from '../../common/constants';
import cardsPic from '../../common/assets/others/cards.png';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import InputMask from 'react-input-mask';
import icons, { CheckCircle } from '../../common/icons';

const useStyles = makeStyles(theme => ({
    root: { height: '100vh' },
    image: {
        backgroundImage: `url(${bgPic})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'fixed',
        width: '100%',
        textAlign: 'center',
        right: 0,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    paper: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 0' },
    container: {
        width: 420,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            width: 300,
            justifyContent: 'space-between',
        },
    },

    logo: {
        height: 100,
        width: 220,
        marginTop: 50,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },

    text: { fontWeight: 'bold', margin: '10px 0' },
    title: { fontWeight: 'bold' },
    underline: { fontWeight: 'bold', margin: '20px 0', textDecoration: 'underline', cursor: 'pointer' },
    input: { margin: '15px 0' },
    marginRight: { marginRight: 15 },
    continueButton: { margin: '10px 0' },

    stepper: {
        padding: '20px 0',
        '& .MuiStepIcon-root': { color: '#B6BFDB' },
        '& .MuiStepIcon-active': { color: '#FE9900' },
        '& .MuiStepIcon-text': { fill: 'white' },
    },

    borderedButton: { border: '1px solid #07A7E3' },
    tickIcon: { fontSize: 10, marginRight: 10, padding: 0, border: '3px solid #07A7E3', borderRadius: 50, fontWeight: 'bold', color: 'white' },
    activeTickIcon: { fontSize: 12, marginRight: 10, padding: 3, backgroundColor: '#07A7E3', borderRadius: 50, fontWeight: 'bold', color: 'white' },
    inline: { display: 'flex', justifyContent: 'space-between', width: '100%', margin: '10px 0' },

    activeText: { color: '#17AE38', display: 'flex', alignItems: 'center' },
    inActiveText: { color: '#6F7F9F', display: 'flex', alignItems: 'center' },

    cardsPic: { height: 40, width: 140 },
    card: { borderBottom: '2px solid #07A7E3', paddingBottom: 5, margin: '20px 0' },
    remberMeContainer: { display: 'flex', alignItems: 'center', width: '100%' },
}));

function OrganizationRegister({ register, type, setError, organizationSubscriptionPrice }) {
    const classes = useStyles();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [activeStep, setActiveStep] = useState(0);
    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isUppercaseIncludedInPassword, setIsUppercaseIncludedInPassword] = useState(false);
    const [isLowercaseIncludedInPassword, setIsLowercaseIncludedInPassword] = useState(false);
    const [isSpecialCharacterIncludedInPassword, setIsSpecialCharacterIncludedInPassword] = useState(false);

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        a_phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        street_address: '',
        apt: '',
        city: '',
        state: '',
        zip_code: '',
        p1_first_name: '',
        p1_last_name: '',
        p1_phone: '',
        p1_email: '',
        p2_first_name: '',
        p2_last_name: '',
        p2_phone: '',
        p2_email: '',
        agreedTerms: false,
    });

    const {
        first_name,
        last_name,
        a_phone,
        email,
        password,
        confirmPassword,
        name,
        phone,
        street_address,
        apt,
        city,
        state,
        zip_code,
        p1_first_name,
        p1_last_name,
        p1_phone,
        p1_email,
        agreedTerms,
    } = data;

    const handleOnChange = evt => {
        const { value, name } = evt.target;
        setData({ ...data, [name]: value });
        if (name === 'password') {
            value.length > 7 ? setIsPasswordLengthValid(true) : setIsPasswordLengthValid(false);
            password && constants.UPPERCASE_REGEX.test(value) ? setIsUppercaseIncludedInPassword(true) : setIsUppercaseIncludedInPassword(false);
            password && constants.LOWERCASE_REGEX.test(value) ? setIsLowercaseIncludedInPassword(true) : setIsLowercaseIncludedInPassword(false);
            constants.SPECIAL_CHARACTER_REGEX.test(value) ? setIsSpecialCharacterIncludedInPassword(true) : setIsSpecialCharacterIncludedInPassword(false);
        }
    };

    const handleSocialAuth = response => {
        console.log(response);
    };

    const handleStep1Next = () => {
        if (
            !password ||
            !confirmPassword ||
            !first_name ||
            !last_name ||
            !a_phone ||
            !email ||
            !isPasswordLengthValid ||
            !isLowercaseIncludedInPassword ||
            !isUppercaseIncludedInPassword ||
            !isSpecialCharacterIncludedInPassword
        )
            return setError('Please enter all required fields.');
        if (!constants.EMAIL_REGEX.test(email)) return setError('Please enter a valid Email.');
        if (password !== confirmPassword) return setError('Password and Confirm Password must be same.');
        setActiveStep(1);
    };

    const handleStep2Next = () => {
        if (!city || !state || !street_address || !zip_code || !name || !phone) return setError('Please enter all required fields.');
        setActiveStep(2);
    };

    const handleStep3Next = () => {
        if (!p1_first_name || !p1_last_name || !p1_email || !p1_phone) return setError('Please enter all required fields.');
        setActiveStep(3);
    };

    const handleSubmit = async evt => {
        if (!agreedTerms) return setError('Please accept Terms & Conditions to proceed');
        evt.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            register({ ...data, payment_method: paymentMethod.id }, type, () => history.push('/verify'));
        }
    };

    const step1 = (
        <div className={classes.container}>
            <VCERNTypography variant="h4" className={classes.text} value="Register" />

            <Stepper color="secondary" activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {organizationSteps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <VCERNTypography
                variant="body2"
                className={classes.text}
                value="Enter you name as it appears in your ID or official document. 
To complete registration, please have beneficiary contact information and debit/credit card handy"
            />

            <VCERNTextField label="First Name *" icon={icons.person} className={classes.input} value={first_name} name="first_name" onChange={handleOnChange} />
            <VCERNTextField label="Last Name *" icon={icons.person} className={classes.input} value={last_name} name="last_name" onChange={handleOnChange} />
            <VCERNTextField label="Email *" icon={icons.email} className={classes.input} value={email} name="email" onChange={handleOnChange} />

            <InputMask mask="(+1) 999 999 99 99" className={classes.input} value={a_phone} onChange={c => setData({ ...data, a_phone: c.target.value })} maskChar=" ">
                {() => <VCERNTextField label="Phone Number *" icon={icons.phone} />}
            </InputMask>

            <VCERNTextField type="password" label="Password *" icon={icons.password} className={classes.input} value={password} name="password" onChange={handleOnChange} />
            <VCERNTextField
                type="password"
                label="Confirm Password *"
                icon={icons.password}
                className={classes.input}
                value={confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
            />

            <VCERNTypography variant="body1" align="left" className={isPasswordLengthValid ? classes.activeText : classes.inActiveText}>
                <CheckCircle fontSize="small" style={{ marginRight: 8 }} />
                Your password should be at least 8
            </VCERNTypography>
            <VCERNTypography variant="body1" align="left" className={isUppercaseIncludedInPassword ? classes.activeText : classes.inActiveText}>
                <CheckCircle fontSize="small" style={{ marginRight: 8 }} />1 upper case letter
            </VCERNTypography>
            <VCERNTypography variant="body1" align="left" className={isLowercaseIncludedInPassword ? classes.activeText : classes.inActiveText}>
                <CheckCircle fontSize="small" style={{ marginRight: 8 }} />1 lower case atleast
            </VCERNTypography>
            <VCERNTypography variant="body1" align="left" className={isSpecialCharacterIncludedInPassword ? classes.activeText : classes.inActiveText}>
                <CheckCircle fontSize="small" style={{ marginRight: 8 }} />1 number or special character atleast
            </VCERNTypography>

            <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleStep1Next} />

            <VCERNTypography variant="h4" align="center" className={classes.text} value="or" />

            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_AUTH_API}
                onSuccess={handleSocialAuth}
                onFailure={handleSocialAuth}
                render={renderProps => (
                    <VCERNButton
                        fullWidth
                        className={classes.continueButton}
                        onClick={renderProps.onClick}
                        background="#F44336"
                        value="Continue with Google"
                        startIcon={icons.facebook}
                    />
                )}
            />

            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_AUTH_API}
                callback={handleSocialAuth}
                render={renderProps => (
                    <VCERNButton
                        fullWidth
                        startIcon={icons.facebook}
                        className={classes.continueButton}
                        onClick={renderProps.onClick}
                        background="#1873EB"
                        value="Continue with Facebook"
                    />
                )}
            />

            <VCERNTypography align="center" variant="body1">
                You have already an accout?{' '}
                <VCERNTypography component="span" variant="body1" color="secondary" className={classes.underline} value="LOGIN" onClick={() => history.push('/login')} />
            </VCERNTypography>
        </div>
    );

    const step2 = (
        <div className={classes.container}>
            <VCERNTypography variant="h4" className={classes.text} value="Organization's Information" />

            <Stepper color="secondary" activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {organizationSteps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <VCERNTypography variant="h6" className={classes.title} value="Organization" />

            <VCERNTextField label="Organization name *" icon={icons.person} className={classes.input} value={name} name="name" onChange={handleOnChange} />

            <InputMask mask="(+1) 999 999 99 99" className={classes.input} value={phone} onChange={c => setData({ ...data, phone: c.target.value })} maskChar=" ">
                {() => <VCERNTextField label="Organizaton Phone Number *" icon={icons.phone} />}
            </InputMask>

            <VCERNTypography variant="h6" className={classes.title} value="Organization Address" />

            <VCERNTextField label="Street address *" icon={icons.street} className={classes.input} value={street_address} name="street_address" onChange={handleOnChange} />
            <VCERNTextField label="APT" icon={icons.apt} className={classes.input} value={apt} name="apt" onChange={handleOnChange} />
            <VCERNAutocomplete
                value={state}
                label="State *"
                icon={icons.state}
                options={statesList}
                className={classes.input}
                onChange={(evt, val) => setData({ ...data, state: val })}
            />
            <VCERNAutocomplete
                value={city}
                disabled={!state}
                label="City/Town *"
                icon={icons.city}
                options={citiesList(state)}
                className={classes.input}
                onChange={(evt, val) => setData({ ...data, city: val })}
            />

            <InputMask mask="99999-9999" className={classes.input} value={zip_code} onChange={c => setData({ ...data, zip_code: c.target.value })} maskChar={null}>
                {() => <VCERNTextField label="Zip Code *" icon={icons.zip} />}
            </InputMask>

            <div className={classes.inline}>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth color="secondary" value="Previous" className={classes.continueButton} onClick={() => setActiveStep(0)} />
                </div>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleStep2Next} />
                </div>
            </div>

            <VCERNTypography align="center" variant="body1">
                You have already an accout?{' '}
                <VCERNTypography component="span" variant="body1" color="secondary" className={classes.underline} value="LOGIN" onClick={() => history.push('/login')} />
            </VCERNTypography>
        </div>
    );

    const step3 = (
        <div className={classes.container}>
            <VCERNTypography variant="h4" className={classes.text} value="Contact Person" />

            <Stepper color="secondary" activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {organizationSteps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <VCERNTypography align="center" variant="body1">
                Don’t have your Agent information?{' '}
                <VCERNTypography component="span" variant="body1" color="secondary" className={classes.underline} value="SKIP" onClick={() => setActiveStep(3)} />
            </VCERNTypography>

            <VCERNTypography variant="body2" className={classes.text} value="Add a Contact Person" />

            <VCERNTextField label="First Name" icon={icons.person} className={classes.input} value={p1_first_name} name="p1_first_name" onChange={handleOnChange} />
            <VCERNTextField label="Last Name" icon={icons.person} className={classes.input} value={p1_last_name} name="p1_last_name" onChange={handleOnChange} />
            <VCERNTextField label="Email" icon={icons.email} className={classes.input} value={p1_email} name="p1_email" onChange={handleOnChange} />

            <InputMask mask="(+1) 999 999 99 99" className={classes.input} value={p1_phone} onChange={c => setData({ ...data, p1_phone: c.target.value })} maskChar=" ">
                {() => <VCERNTextField label="Phone Number *" icon={icons.phone} />}
            </InputMask>

            {/* <VCERNTypography variant="body2" className={classes.text} value="Registrant Agent information" />

            <VCERNTextField
                label="First Name"
                icon={icons.person}
                className={classes.input}
                value={p2_first_name}
                name="p2_first_name"
                onChange={handleOnChange}
            />
            <VCERNTextField label="Last Name" icon={icons.person} className={classes.input} value={p2_last_name} name="p2_last_name" onChange={handleOnChange} />
            <VCERNTextField label="Email" icon={icons.email} className={classes.input} value={p2_email} name="p2_email" onChange={handleOnChange} />
            <VCERNTextField label="Phone Number" icon={icons.phone} className={classes.input} value={p2_phone} name="p2_phone" onChange={handleOnChange} /> */}

            <div className={classes.inline}>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth color="secondary" value="Previous" className={classes.continueButton} onClick={() => setActiveStep(1)} />
                </div>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleStep3Next} />
                </div>
            </div>

            <VCERNTypography align="center" variant="body1">
                You have already an accout?{' '}
                <VCERNTypography component="span" variant="body1" color="secondary" className={classes.underline} value="LOGIN" onClick={() => history.push('/login')} />
            </VCERNTypography>
        </div>
    );

    const step4 = (
        <div className={classes.container}>
            <VCERNTypography variant="h4" className={classes.text} value="Payment Information" />

            <Stepper color="secondary" activeStep={activeStep} alternativeLabel className={classes.stepper}>
                {organizationSteps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <VCERNTypography variant="body2" className={classes.text} value="To complete registration, please have beneficiary contact information and debit/credit card handy" />

            <div className={classes.inline}>
                <VCERNTypography variant="body1" className={classes.text} value="Credit/Debit Card" />
                <img src={cardsPic} alt="cards" className={classes.cardsPic} />
            </div>
            <VCERNTypography variant="body1" className={classes.text} value="Summary" />

            <VCERNTypography variant="body1" className={classes.text}>
                App Setup Fee: <VCERNTypography variant="body1" component="span" value={`$${organizationSubscriptionPrice}/yr`} />
            </VCERNTypography>

            <VCERNTypography variant="body1" className={classes.text} value="You will be charged a one time fee of $399 by vCERN to setup your plateform." />

            <CardElement
                className={classes.card}
                options={{
                    iconStyle: 'solid',
                    style: {
                        base: {
                            fontSize: '16px',
                            fontSmoothing: 'antialiased',
                        },
                        invalid: {
                            iconColor: 'red',
                            color: 'red',
                        },
                    },
                }}
            />

            <div className={classes.remberMeContainer}>
                <Checkbox color="secondary" value={agreedTerms} checked={agreedTerms} onChange={evt => setData({ ...data, agreedTerms: evt.target.checked })} />
                <VCERNTypography variant="body1" className={classes.text}>
                    I agree with All{' '}
                    <VCERNTypography
                        variant="body1"
                        color="secondary"
                        component="span"
                        className={classes.underline}
                        value="Terms & Conditions"
                        onClick={() => history.push('/terms-and-conditions')}
                    />{' '}
                    and{' '}
                    <VCERNTypography
                        variant="body1"
                        component="span"
                        color="secondary"
                        className={classes.underline}
                        value="Payment agreements"
                        onClick={() => history.push('/payment-agreements')}
                    />
                </VCERNTypography>
            </div>

            <div className={classes.inline}>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth color="secondary" value="Previous" className={classes.continueButton} onClick={() => setActiveStep(2)} />
                </div>
                <div style={{ width: '46%' }}>
                    <VCERNButton fullWidth value="Continue" className={classes.continueButton} onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );

    return (
        <Grid container component="main" className={classes.root}>
            <Grid item xs={12} sm={8} md={7} component={Paper} className={classes.paper}>
                <div className={classes.container}>{activeStep === 0 ? step1 : activeStep === 1 ? step2 : activeStep === 2 ? step3 : step4}</div>
            </Grid>
            <Grid item xs={false} sm={4} md={5} alignContent="center" className={classes.image}>
                <img src={logo} alt="logo" className={classes.logo} />
            </Grid>
        </Grid>
    );
}
export default connect(data => data, { register: AC.register, setError: AC.setError })(OrganizationRegister);
