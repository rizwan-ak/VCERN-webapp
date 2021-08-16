import { Checkbox, Divider, makeStyles, Radio } from '@material-ui/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AC from '../redux/actions/actionCreater';
import VCERNModal from './elements/VCERNModal';
import VCERNTypography from './elements/VCERNTypography';

const useStyles = makeStyles(theme => ({
    boldText: { fontWeight: 'bold' },

    divider: { margin: '15px 0' },
    inline: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    cardBox: { display: 'flex', alignItems: 'center' },

    membershipText: { padding: 10, fontWeight: 'bold', boxShadow: '0 0 5px #888888', borderRadius: 5 },
    remberMeContainer: { display: 'flex', alignItems: 'center', width: '100%' },
    underline: { fontWeight: 'bold', margin: '20px 0', textDecoration: 'underline', cursor: 'pointer' },
    card: { borderBottom: '2px solid #07A7E3', paddingBottom: 5, margin: '20px 10px' },
}));
function PaymentModal({ title, open, onClose, onConfirm, setError, userSubscriptionPrice, currentOrganization }) {
    const classes = useStyles();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [selectedCard, setSelectedCard] = useState(0);
    const [agreedTerms, setAgreedTerms] = useState(false);

    const handleSubmit = async evt => {
        if (!(selectedCard === 999)) return onConfirm();
        if (!agreedTerms) return setError('Please accept Terms & Conditions to proceed');
        evt.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            // register({ ...data, payment_method: paymentMethod.id }, type, () => history.push('/verify'));
            onConfirm();
        }
    };

    return (
        <VCERNModal title="Payment" open={open} onClose={onClose} onConfirm={handleSubmit} buttonTittle={title}>
            <div className={classes.inline}>
                <VCERNTypography value="Yearly Membership" className={classes.boldText} customColor="#657285" />
                <VCERNTypography value="Yearly Membership" className={classes.membershipText} />
            </div>
            <Divider variant="fullWidth" className={classes.divider} />
            <VCERNTypography value="Summary" variant="h6" className={classes.boldText} />
            <VCERNTypography value={`Once a year, you will be charged a $${userSubscriptionPrice}  membership fee by vCERN.`} variant="body2" />
            <VCERNTypography variant="body2">
                Additionally,
                <VCERNTypography variant="body2" color="primary" component="span" value={` ${currentOrganization?.name} `} />
                will collect a contribution from you every time someone passes away in this pool. This contribution is determined by dividng the payout amount by the number of
                people in this pool.
            </VCERNTypography>
            <VCERNTypography value=" Your beneficiary will collect $20,000 in the event of your passing." variant="body1" className={classes.boldText} />
            <Divider variant="fullWidth" className={classes.divider} />
            <VCERNTypography value="Select card" variant="h6" className={classes.boldText} />
            {[1, 1].map((el, idx) => (
                <div key={idx} className={classes.cardBox}>
                    <Radio checked={idx === selectedCard} onChange={() => setSelectedCard(idx)} />
                    <VCERNTypography variant="body2" value="**** **** **** 0000" className={classes.boldText} customColor="#657285" />
                </div>
            ))}
            <div className={classes.cardBox}>
                <Radio checked={selectedCard === 999} onChange={() => setSelectedCard(999)} />
                <VCERNTypography variant="body2" value="Add New Card" className={classes.boldText} />
            </div>
            {selectedCard === 999 && (
                <div>
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
                </div>
            )}
        </VCERNModal>
    );
}
export default connect(state => state, { setError: AC.setError })(PaymentModal);
