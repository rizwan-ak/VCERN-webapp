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
import VCERNModal from '../../common/elements/VCERNModal';
import VCERNDropdown from '../../common/elements/VCERNDropdown';
import { vcernAdminRoles } from '../../common/data';
import AC from '../../redux/actions/actionCreater';

import InputMask from 'react-input-mask';
import constants from '../../common/constants';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    boldText: { fontWeight: 'bold' },

    // listBox: { maxHeight: 400, overflow: 'scroll', padding: '0 10px' },
    listItem: { display: 'flex', alignItems: 'center', margin: '10px 0' },
    image: { height: 60, width: 60, marginRight: 15 },
    grow: { flexGrow: 1 },
    listHeader: { margin: '10px 0' },
    optionButton: { marginRight: 20, color: '#FE9900' },
    title: { fontWeight: 'bold', margin: '10px 0' },
}));

function ManageAdmins({ fetchAdmins, token, addVcernAdmin, setError, toggleVcernAdminRole, toggleVcernAdminAvailability, setCurrentPageTitle }) {
    const classes = useStyles();

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showConfirmationText, setShowConfirmationText] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [admins, setAdmins] = useState([]);

    const [state, setState] = useState({ search: '', email: '', type: '', first_name: '', last_name: '', phone: '' });
    const { search, email, type, first_name, last_name, phone } = state;

    useEffect(() => {
        setCurrentPageTitle(`Manage Admins`);
        fetchAdmins(token, setAdmins);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilteredAdmins(admins.filter(el => el?.first_name.toLowerCase().includes(search.toLowerCase()) || el?.last_name.toLowerCase().includes(search.toLowerCase())));

        // eslint-disable-next-line
    }, [search.length]);

    useEffect(() => {
        setFilteredAdmins(admins);
    }, [admins]);

    const handleActionClick = (idx, action) => {
        action === 'remove'
            ? setShowConfirmationText('Are you sure you want to remove this Admin?')
            : setShowConfirmationText('Are you sure you want to change the role of this Admin?');
        setSelectedAdmin({ idx, action });
        setShowConfirmationModal(true);
    };

    const handleOnChange = evt => {
        const { name, value } = evt.target;
        setState({ ...state, [name]: value });
    };

    const handleAddAdmin = () => {
        if (!constants.EMAIL_REGEX.test(email) || !phone || !first_name || !last_name || !type) return setError('Please enter all fields');

        addVcernAdmin(state, token, val => {
            setAdmins([...admins.filter(el => el._id !== val._id), val]);
            setShowAddAdminModal(false);
        });
    };

    const handleSubmit = () => {
        selectedAdmin.action === 'remove'
            ? toggleVcernAdminAvailability(selectedAdmin.idx, token, val => {
                  setShowConfirmationModal(false);
                  setAdmins([...admins.filter(el => el._id !== val._id), val]);
              })
            : toggleVcernAdminRole(selectedAdmin.idx, token, val => {
                  setShowConfirmationModal(false);
                  setAdmins([...admins.filter(el => el._id !== val._id), val]);
              });
    };

    return (
        <div>
            <Grid container spacing={1} className={classes.listHeader}>
                <Grid item xs={12} md={6} lg={4}>
                    <VCERNTextField
                        variant="outlined"
                        icon={icons.search}
                        className={classes.input}
                        placeholder="Search Admin"
                        value={search}
                        name="search"
                        onChange={handleOnChange}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <VCERNButton value="Add Admin" startIcon={icons.add} onClick={() => setShowAddAdminModal(true)} align="right" />
                </Grid>
            </Grid>
            <div className={classes.listBox}>
                {filteredAdmins.map((el, idx) => (
                    <>
                        <div className={classes.listItem}>
                            <VCERNAvatar className={classes.image} src={el?.image} />
                            <div className={classes.grow}>
                                <VCERNTypography
                                    className={classes.boldText}
                                    variant="body1"
                                    value={`${el.first_name} ${el.last_name} 
                                ${el?.type === 'basic' ? '(Admin)' : '(Super Admin)'}`}
                                />
                                <VCERNTypography className={classes.boldText} variant="body2" value="Member Since 21/05/2020" customColor="#6F7F9F" />
                            </div>
                            <VCERNButton
                                variant="outlined"
                                value={el?.type === 'basic' ? 'Make Super Admin' : 'Make Admin'}
                                color="secondary"
                                size="small"
                                onClick={() => handleActionClick(el?._id, 'toggleRole')}
                                className={classes.optionButton}
                            />
                            <VCERNButton
                                variant="outlined"
                                value={el?.status === 'active' ? 'Disable' : 'Enable'}
                                size="small"
                                onClick={() => handleActionClick(el?._id, 'remove')}
                            />
                        </div>
                        <Divider />
                    </>
                ))}
            </div>
            <VCERNConfirmationModal body={showConfirmationText} open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} onConfirm={handleSubmit} />
            <VCERNModal title="Add Admin" open={showAddAdminModal} onClose={() => setShowAddAdminModal(false)} onConfirm={handleAddAdmin} buttonTittle="Add Admin">
                {/* <VCERNTypography className={classes.title} variant="body1" value="Email" /> */}
                <VCERNTextField
                    autoFocus
                    variant="outlined"
                    icon={icons.email}
                    className={classes.input}
                    placeholder="Email"
                    value={email}
                    name="email"
                    onChange={handleOnChange}
                />
                <VCERNTextField
                    placeholder="First Name"
                    variant="outlined"
                    icon={icons.person}
                    className={classes.input}
                    value={first_name}
                    name="first_name"
                    onChange={handleOnChange}
                />
                <VCERNTextField
                    variant="outlined"
                    icon={icons.person}
                    className={classes.input}
                    placeholder="Last Name"
                    value={last_name}
                    name="last_name"
                    onChange={handleOnChange}
                />
                <InputMask
                    maskChar=" "
                    value={phone}
                    mask="(+1) 999 999 99 99"
                    className={classes.input}
                    name="testasdf"
                    onChange={evt => setState({ ...state, phone: evt.target.value })}
                >
                    {() => <VCERNTextField variant="outlined" name="test" icon={icons.phone} />}
                </InputMask>

                <VCERNTypography className={classes.title} variant="body1" value="Type" />
                <VCERNDropdown value={type} name="type" onChange={handleOnChange} options={vcernAdminRoles} />
            </VCERNModal>
        </div>
    );
}
export default connect(state => state, {
    fetchAdmins: AC.fetchAdmins,
    addVcernAdmin: AC.addVcernAdmin,
    setError: AC.setError,
    toggleVcernAdminRole: AC.toggleVcernAdminRole,
    toggleVcernAdminAvailability: AC.toggleVcernAdminAvailability,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(ManageAdmins);
