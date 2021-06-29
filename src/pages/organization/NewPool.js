import { Checkbox, Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import VCERNButton from '../../common/elements/VCERNButton';
import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import VCERNTextField from '../../common/elements/VCERNTextField';
import VCERNAutocomplete from '../../common/elements/VCERNAutocomplete';

import { contributionFequencyList } from '../../common/data';
import icons from '../../common/icons';
import AC from '../../redux/actions/actionCreater';

import VCERNAlert from '../../common/elements/VCERNAlert';

const useStyles = makeStyles(theme => ({
    input: { margin: '15px 0' },
    title: { marginTop: 10, fontWeight: 'bold' },
    remberMeContainer: { display: 'flex', alignItems: 'center', width: '100%' },
}));

function NewPool({ currentUser, requestNewPool, token }) {
    const classes = useStyles();
    const history = useHistory();

    const [successMessage, setSuccessMessage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        time_limit: true,
        contribution: '',
        recurring_frequency: '',
        single_event: false,
    });
    const { name, description, start_date, end_date, time_limit, contribution, recurring_frequency, single_event } = data;

    const handleOnChange = evt => {
        const { value, name } = evt.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = () => {
        requestNewPool(data, token, () => {
            setSuccessMessage('New Pool Request Sent Successfully');
            setTimeout(() => {
                history.push('/dashboard');
            }, 3000);
        });
    };

    return (
        <Grid container spacing={3}>
            <VCERNTypography variant="body1" value="Pool Name *" className={classes.title} />
            <VCERNTextField variant="outlined" placeholder="Name" className={classes.input} value={name} name="name" onChange={handleOnChange} />
            <VCERNTypography variant="body1" value="Description Pool Purpose *" className={classes.title} />
            <VCERNTextField
                variant="outlined"
                multiline
                rows={5}
                placeholder="Short Description goes here...  e.g.  Assist members for every new born."
                value={description}
                name="description"
                onChange={handleOnChange}
                className={classes.input}
            />
            <VCERNTypography variant="body1" value="Start Date *" className={classes.title} />
            <VCERNTextField limit type="date" variant="outlined" className={classes.input} value={start_date} name="start_date" onChange={handleOnChange} />

            <VCERNTypography variant="body1" value="End Date *" className={classes.title} />
            <div className={classes.remberMeContainer}>
                <Checkbox color="secondary" value={!time_limit} checked={!time_limit} onChange={evt => setData({ ...data, time_limit: !evt.target.checked })} />
                <VCERNTypography variant="body1" value="No time limit" />
            </div>
            <VCERNTextField limit disabled={!time_limit} type="date" variant="outlined" className={classes.input} value={end_date} name="end_date" onChange={handleOnChange} />

            <VCERNTypography variant="body1" value="Contribution *" className={classes.title} />
            <VCERNTextField variant="outlined" placeholder="$20" className={classes.input} value={contribution} name="contribution" onChange={handleOnChange} />

            <VCERNTypography variant="body1" value="Contribution recurring_frequency *" className={classes.title} />
            <div className={classes.remberMeContainer}>
                <Checkbox color="secondary" value={single_event} checked={single_event} onChange={evt => setData({ ...data, single_event: evt.target.checked })} />
                <VCERNTypography variant="body1" value="Single Event" />
            </div>

            {/* <VCERNTypography variant="body1" value="Recurring Event" className={classes.title} /> */}
            <VCERNAutocomplete
                disabled={single_event}
                variant="outlined"
                value={recurring_frequency}
                placeholder="How  often..."
                options={contributionFequencyList}
                className={classes.input}
                onChange={(evt, val) => setData({ ...data, recurring_frequency: val })}
            />
            <VCERNButton fullWidth startIcon={icons.submit} value="Submit Request" onClick={handleSubmit} />
            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </Grid>
    );
}
export default connect(state => state, { requestNewPool: AC.requestNewPool })(NewPool);
