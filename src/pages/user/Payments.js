import { Checkbox, Divider, Grid, makeStyles, Radio } from '@material-ui/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AC from '../../redux/actions/actionCreater';
import VCERNAvatar from '../../common/elements/VCERNAvatar';
import VCERNTypography from '../../common/elements/VCERNTypography';
import MonthsSlider from '../../common/MonthsSlider';
import VCERNButton from '../../common/elements/VCERNButton';
import icons from '../../common/icons';
import VCERNConfirmationModal from '../../common/elements/VCERNConfirmationModal';
import { useEffect } from 'react';
import { getFormattedDate, getYear } from '../../common/helper';

import { useCardBrand, images } from 'react-card-brand';
import { getRoles } from '../../common/data';

const useStyles = makeStyles(theme => ({
    boldText: { fontWeight: 'bold', margin: '5px 0' },
    cardBox: { display: 'flex', alignItems: 'center' },

    remberMeContainer: { display: 'flex', alignItems: 'center', width: '100%' },
    underline: { fontWeight: 'bold', margin: '20px 0', textDecoration: 'underline', cursor: 'pointer' },
    card: { borderBottom: '2px solid #07A7E3', paddingBottom: 5, margin: '20px 10px' },

    sliderBox: { margin: '50px 30px 30px 30px' },
    listBox: { display: 'flex', alignItems: 'center' },
    pic: { height: 60, width: 60, marginRight: 25 },
    reasonText: { background: '#FFEDEE', color: '#FE4A54', borderRadius: 10, padding: '2px 5px' },
    grow: { flexGrow: 1 },
    divider: { margin: '15px 0' },

    deleteButton: { color: 'red' },
    defaultButton: { marginRight: 25 },
}));

function Payments({
    setError,
    fetchPaymentMethods,
    token,
    setDefaultCard,
    addNewPaymentMethod,
    removePaymentMethod,
    fetchMembersPayments,
    type,
    setCurrentPageTitle,
    currentOrganization,
    userSubscriptionPrice,
}) {
    const classes = useStyles();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const { getSvgProps } = useCardBrand();

    const [selectedCard, setSelectedCard] = useState(0);
    const [agreedTerms, setAgreedTerms] = useState(false);
    const [methods, setMethods] = useState([]);

    const [paymentHistory, setPaymentHistory] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(0);

    const [defaultMethod, setDefaultMethod] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Payments`);
        handleGetMethods();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        fetchMembersPayments(currentMonth, getYear(currentMonth), token, setPaymentHistory);

        // eslint-disable-next-line
    }, [currentMonth]);

    const handleGetMethods = () => {
        fetchPaymentMethods(token, val => {
            setDefaultMethod(val.default_option);
            setMethods(val.options);
        });
    };

    const handleAddCard = async evt => {
        if (!agreedTerms) return setError('Please accept Terms & Conditions to proceed');
        evt.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            addNewPaymentMethod(paymentMethod.id, token, handleGetMethods);
        }
    };

    const handleRemove = () => {
        removePaymentMethod(selectedCard, token, () => {
            handleGetMethods();
            setShowConfirmationModal(false);
        });
    };

    const handleSetDefault = idx => {
        setDefaultCard(idx, token, handleGetMethods);
    };

    const handleActionClick = idx => {
        setSelectedCard(idx);
        setShowConfirmationModal(true);
    };

    return (
        <div>
            {methods.map((el, idx) => (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} className={classes.cardBox}>
                        <Radio checked={el?.id === defaultMethod} onChange={() => setSelectedCard(idx)} />
                        <div className={classes.defaultButton}>
                            <svg {...getSvgProps({ type: el.brand, images })} />
                        </div>
                        <div className={classes.defaultButton}>
                            <VCERNTypography variant="body2" value={el?.brand} className={classes.boldText} />
                        </div>
                        <VCERNTypography variant="body2" value={`**** **** **** ${el?.last4}`} className={classes.boldText} customColor="#657285" />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.cardBox} direction="row-reverse">
                        <VCERNButton
                            variant="outlined"
                            size="small"
                            value="Delete"
                            startIcon={icons.delete}
                            color="primary"
                            className={classes.deleteButton}
                            onClick={() => handleActionClick(el?.id)}
                        />
                        {el?.id === defaultMethod ? (
                            <VCERNTypography variant="body1" value="DEFAULT CARD" className={[classes.boldText, classes.defaultButton]} />
                        ) : (
                            <VCERNButton
                                variant="outlined"
                                size="small"
                                value="Make Default"
                                color="secondary"
                                className={classes.defaultButton}
                                onClick={() => handleSetDefault(el?.id)}
                            />
                        )}
                    </Grid>
                </Grid>
            ))}
            <div className={classes.cardBox}>
                <Radio checked={selectedCard === 999} onChange={() => setSelectedCard(999)} />
                <VCERNTypography variant="body2" value="Add New Card" className={classes.boldText} />
            </div>
            {selectedCard === 999 && (
                <div>
                    <VCERNTypography value="Summary" variant="h6" className={classes.boldText} />
                    <VCERNTypography value={`Once a year, you will be charged a $${userSubscriptionPrice}  membership fee by vCERN.`} variant="body2" />
                    <VCERNTypography variant="body2">
                        Additionally,
                        <VCERNTypography variant="body2" color="primary" component="span" value={` ${currentOrganization?.name} `} />
                        will collect a contribution from you every time someone passes away in this pool. This contribution is determined by dividng the payout amount by the number
                        of people in this pool.
                    </VCERNTypography>
                    <VCERNTypography value=" Your beneficiary will collect $20,000 in the event of your passing." variant="body1" className={classes.boldText} />
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
                        <Checkbox color="secondary" value={agreedTerms} checked={agreedTerms} onChange={evt => setAgreedTerms(evt.target.checked)} />
                        <VCERNTypography variant="body1" className={classes.boldText}>
                            By checking this box, you agree to the{' '}
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
                                value="Privacy Policy"
                                onClick={() => history.push('/payment-agreements')}
                            />
                        </VCERNTypography>
                    </div>
                    <VCERNButton align="left" value="Add" startIcon={icons.add} onClick={handleAddCard} />
                </div>
            )}
            <div className={classes.sliderBox}>
                <MonthsSlider currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            </div>
            {paymentHistory.map(({ amount, payed_for_name, payed_for_image, date, type }, idx) => (
                <div key={idx}>
                    <div className={classes.listBox}>
                        <VCERNAvatar className={classes.pic} src={payed_for_image} />
                        <div className={classes.grow}>
                            <VCERNTypography variant="body1" value={payed_for_name} className={classes.boldText} />
                            <VCERNTypography variant="body2" value={getFormattedDate(date)} />
                            <VCERNTypography variant="caption" value={type === 'EVENT_PAYMENT' ? 'Contribution' : 'Membership Fee'} className={classes.reasonText} />
                        </div>
                        <VCERNTypography variant="body1" value={`$${amount}`} className={classes.boldText} />
                    </div>
                    <Divider variant="fullWidth" className={classes.divider} />
                </div>
            ))}

            <VCERNConfirmationModal
                body="Are you you want to Delete this card?"
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleRemove}
            />
        </div>
    );
}
export default connect(state => state, {
    setError: AC.setError,
    fetchPaymentMethods: AC.fetchPaymentMethods,
    setDefaultCard: AC.setDefaultCard,
    addNewPaymentMethod: AC.addNewPaymentMethod,
    removePaymentMethod: AC.removePaymentMethod,
    fetchMembersPayments: AC.fetchMembersPayments,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(Payments);
