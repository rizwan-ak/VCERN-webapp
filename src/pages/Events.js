import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import VCERNTextField from '../common/elements/VCERNTextField';
import icons from '../common/icons';
import InfoCard from '../common/InfoCard';
import AC from '../redux/actions/actionCreater';

const useStyles = makeStyles(theme => ({}));

function Events({ setCurrentPageTitle }) {
    const classes = useStyles();
    const location = useLocation();

    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);

    useEffect(() => {
        setCurrentPageTitle(`Events`);
        location.state.length && setEvents(location.state);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilteredMembers(events.filter(el => el?.title.toLowerCase().includes(search.toLowerCase())));
        // eslint-disable-next-line
    }, [search.length]);

    useEffect(() => {
        setFilteredMembers(events);
    }, [events]);

    return (
        <Grid container spacing={3} style={{ margin: '20px 0' }}>
            <VCERNTextField
                variant="outlined"
                icon={icons.search}
                className={classes.input}
                placeholder="Search Events"
                value={search}
                name="search"
                onChange={evt => setSearch(evt.target.value)}
            />
            {filteredMembers.map((el, idx) => (
                <InfoCard key={idx} event={el} />
            ))}
        </Grid>
    );
}
export default connect(state => state, { setCurrentPageTitle: AC.setCurrentPageTitle })(Events);
