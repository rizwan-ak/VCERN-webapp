import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';

import VCERNLineChart from '../../common/elements/VCERNLineChart';
import VCERNPieChart from '../../common/elements/VCERNPieChart';
import VCERNTypography from '../../common/elements/VCERNTypography';

import giftPic from '../../common/assets/others/gift.png';

import VCERNGroupAvatar from '../../common/elements/VCERNGroupAvatar';

import cx from 'clsx';
import { connect } from 'react-redux';
import icons from '../../common/icons';
import VCERNTextField from '../../common/elements/VCERNTextField';
import { useState } from 'react';
import AC from '../../redux/actions/actionCreater';
import VCERNAlert from '../../common/elements/VCERNAlert';
import DashboardHeader from '../../common/DashboardHeader';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    title: { margin: '15px 0', fontWeight: 'bold' },
    button: { margin: '20px 0' },
}));

function ManageGroups({ triggerEvent, triggerNotification, token, selectedPool }) {
    const classes = useStyles();
    const history = useHistory();

    const [data, setData] = useState({ description: '', member_id: '', place_death: '', cause_death: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const { description, member_id, place_death, cause_death } = data;

    const handleOnChange = evt => {
        const { value, name } = evt.target;
        setData({ ...data, [name]: value });
    };

    const handleTriggerNotification = () => {
        triggerNotification({ title: 'Announcement', description }, token, () => {
            setSuccessMessage('Notification Sent Successfully.');
            setData({ ...data, description: '' });
        });
    };

    const handleTriggerEvent = () => {
        triggerEvent({ member_id, pool_id: selectedPool?._id, title: cause_death, description: place_death }, token, () => {
            setSuccessMessage('Notification Sent Successfully.');
            setData({ ...data, member_id: '', place_death: '', cause_death: '' });
        });
    };

    const disableEventTriggerButton = !place_death || !cause_death || !member_id;

    return (
        <Grid container spacing={3}>
            <DashboardHeader />
            <Grid item xs={12}>
                <VCERNTypography className={classes.title} variant="h5" value="Trigger Death Announcement & Contribution Collection " />
                <VCERNTextField variant="outlined" className={classes.input} placeholder="Membership ID" value={member_id} name="member_id" onChange={handleOnChange} />
                <VCERNTextField variant="outlined" className={classes.input} placeholder="Place of Death " value={place_death} name="place_death" onChange={handleOnChange} />
                <VCERNTextField variant="outlined" className={classes.input} placeholder="Cause of Death " value={cause_death} name="cause_death" onChange={handleOnChange} />
                <VCERNButton fullWidth startIcon={icons.trigger} value="Trigger" disabled={disableEventTriggerButton} className={classes.button} onClick={handleTriggerEvent} />

                <VCERNTypography className={classes.title} variant="h5" value="Notification" />
                <VCERNTextField
                    rows={5}
                    multiline
                    variant="outlined"
                    className={classes.input}
                    placeholder="Blast notification to all members..."
                    value={description}
                    name="description"
                    onChange={handleOnChange}
                />
                <VCERNButton fullWidth startIcon={icons.trigger} value="Trigger Notify" disabled={!description} className={classes.button} onClick={handleTriggerNotification} />
            </Grid>

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </Grid>
    );
}
export default connect(state => state, { triggerNotification: AC.triggerNotification, triggerEvent: AC.triggerEvent })(ManageGroups);
