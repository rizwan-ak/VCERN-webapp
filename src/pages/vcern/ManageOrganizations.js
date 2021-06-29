import React from 'react';
import VCERNTypography from '../../common/elements/VCERNTypography';
import VCERNTextField from '../../common/elements/VCERNTextField';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import icons from '../../common/icons';
import VCERNButton from '../../common/elements/VCERNButton';

import VCERNAvatar from '../../common/elements/VCERNAvatar';
import VCERNConfirmationModal from '../../common/elements/VCERNConfirmationModal';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import AC from '../../redux/actions/actionCreater';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    boldText: { fontWeight: 'bold' },

    // listBox: { maxHeight: 400, overflow: 'scroll', padding: '0 10px' },
    listItem: { display: 'flex', alignItems: 'center', margin: '10px 0' },
    image: { height: 60, width: 60, marginRight: 15 },
    grow: { flexGrow: 1 },
    listHeader: { margin: '10px 0' },
}));

function ManageOrganizations({ fetchOrganizations, organizations, toggleOrganizationsAvailability, token }) {
    const classes = useStyles();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedOrgaization, setSelectedOrgaization] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredorganizations, setFilteredOrganizations] = useState([]);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    useEffect(() => {
        setFilteredOrganizations(organizations.filter(el => el?.name.toLowerCase().includes(search.toLowerCase())));
    }, [search.length]);

    useEffect(() => {
        setFilteredOrganizations(organizations);
    }, [organizations]);

    const handleActionClick = idx => {
        setSelectedOrgaization(idx);
        setShowConfirmationModal(true);
    };

    const handleSubmit = () => {
        toggleOrganizationsAvailability(selectedOrgaization, token, organizations, () => setShowConfirmationModal(false));
    };

    return (
        <div>
            <Grid container spacing={1} className={classes.listHeader}>
                <Grid item xs={12} md={6} lg={8}></Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <VCERNTextField
                        variant="outlined"
                        icon={icons.search}
                        className={classes.input}
                        placeholder="Search Organizations"
                        value={search}
                        name="search"
                        onChange={evt => setSearch(evt.target.value)}
                    />
                </Grid>
            </Grid>
            <div className={classes.listBox}>
                {filteredorganizations.map((el, idx) => (
                    <>
                        <div className={classes.listItem}>
                            <VCERNAvatar className={classes.image} src={el?.image} />
                            <div className={classes.grow}>
                                <VCERNTypography className={classes.boldText} variant="body1" value={el?.name} />
                                {/* <VCERNTypography className={classes.boldText} variant="body2" value="Member Since 21/05/2020" customColor="#6F7F9F" /> */}
                            </div>
                            <VCERNButton variant="outlined" value={el?.disabled ? 'Enable' : 'Disable'} size="small" onClick={() => handleActionClick(el?._id)} />
                        </div>
                        <Divider />
                    </>
                ))}
            </div>
            <VCERNConfirmationModal
                body="Are you you want to change the visibility of this Organization."
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleSubmit}
            />
        </div>
    );
}
export default connect(state => state, { fetchOrganizations: AC.fetchOrganizations, toggleOrganizationsAvailability: AC.toggleOrganizationsAvailability })(ManageOrganizations);
