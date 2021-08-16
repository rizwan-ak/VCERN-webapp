import React from 'react';
import VCERNTypography from '../../common/elements/VCERNTypography';
import VCERNTextField from '../../common/elements/VCERNTextField';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import icons from '../../common/icons';
import VCERNButton from '../../common/elements/VCERNButton';

import VCERNAvatar from '../../common/elements/VCERNAvatar';
import VCERNModal from '../../common/elements/VCERNModal';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import AC from '../../redux/actions/actionCreater';
import { getFormattedDate } from '../../common/helper';
import VCERNConfirmationModal from '../../common/elements/VCERNConfirmationModal';

import { FacebookShareButton } from 'react-share';
import VCERNAlert from '../../common/elements/VCERNAlert';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    boldText: { fontWeight: 'bold' },
    button: { margin: '20px 0' },

    inviteBox: { margin: '20px 0' },
    inviteList: { display: 'flex', alignItems: 'center', margin: '10px 0' },
    inviteIcon: { marginRight: 15 },
    inviteInput: { marginRight: 10 },

    listBox: { maxHeight: 400, overflow: 'scroll', padding: '0 10px' },
    listItem: { display: 'flex', alignItems: 'center', margin: '10px 0' },
    image: { height: 60, width: 60, marginRight: 15, cursor: 'pointer' },
    grow: { flexGrow: 1 },
    listHeader: { margin: '10px 0' },
}));

function Settings({
    currentOrganization,
    fetchMembersNotInPool,
    fetchOrganizationAdmins,
    token,
    fetchPoolMembers,
    selectedPool,
    inviteToJoin,
    makeMemberAdmin,
    inviteToJoinPool,
    removeOrganizationAdmin,
    removeMemberFromPool,
    setCurrentPageTitle,
}) {
    const classes = useStyles();
    const history = useHistory();

    const [showMemberInviteModal, setShowMemberInviteModal] = useState(false);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [state, setState] = useState({ search: '', phone: '', email: '', searchAllMembers: '' });
    const { search, phone, email, searchAllMembers } = state;

    const [admins, setAdmins] = useState([]);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [poolMembers, setPoolMembers] = useState([]);
    const [filteredPoolMembers, setFilteredPoolMembers] = useState([]);

    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setCurrentPageTitle(`Manage Members`);

        fetchOrganizationAdmins(currentOrganization?._id, setAdmins);
        fetchMembersNotInPool(selectedPool?._id, token, setMembers);
        fetchPoolMembers(selectedPool?._id, token, setPoolMembers);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFilteredMembers(
            members.filter(el => el?.first_name.toLowerCase().includes(searchAllMembers.toLowerCase()) || el?.last_name.toLowerCase().includes(searchAllMembers.toLowerCase())),
        );

        // eslint-disable-next-line
    }, [searchAllMembers.length]);

    useEffect(() => {
        setFilteredMembers(members);
    }, [members]);

    useEffect(() => {
        setFilteredPoolMembers(poolMembers.filter(el => el?.first_name.toLowerCase().includes(search.toLowerCase()) || el?.last_name.toLowerCase().includes(search.toLowerCase())));

        // eslint-disable-next-line
    }, [search.length]);

    useEffect(() => {
        setFilteredPoolMembers(poolMembers);
    }, [poolMembers]);

    const handleOnChange = evt => {
        const { name, value } = evt.target;
        setState({ ...state, [name]: value });
    };

    const handleActionClick = (idx, type) => {
        setSelectedMember({ idx, type });
        setShowConfirmationModal(true);
    };

    const handleRemove = () => {
        selectedMember.type === 'Admin'
            ? removeOrganizationAdmin(selectedMember.idx, token, () => {
                  setSuccessMessage('Admin Removed Successfully');
                  setAdmins(admins.filter(el => el._id !== selectedMember.idx));
                  setShowConfirmationModal(false);
              })
            : removeMemberFromPool(selectedMember.idx, token, () => {
                  setSuccessMessage('Admin Removed Successfully');
                  setPoolMembers(poolMembers.filter(el => el.membership_id !== selectedMember.idx));
                  setShowConfirmationModal(false);
              });
    };

    const handleCopyText = () => {
        navigator.clipboard.writeText('this.state.textToCopy   asdf');
        setSuccessMessage('Link Copied Successfully');
    };

    const handleInviteMember = idx => {
        inviteToJoinPool({ pool: selectedPool?._id, members: [idx] }, token, () => setSuccessMessage('Member Invited Successfully'));
    };

    const handleInviteAllMembers = () => {
        inviteToJoinPool({ pool: selectedPool?._id, members: members.map(el => el._id) }, token, () => {
            setSuccessMessage('Members Invited Successfully');
            setShowMemberInviteModal(false);
        });
    };

    const handleAddAdmin = idx => {
        makeMemberAdmin(idx, token, val => {
            setAdmins([...admins, val]);
            setShowAddAdminModal(false);
            setSuccessMessage('Admin Added Successfully');
        });
    };

    const handleInviteTojoin = via => {
        inviteToJoin({ numbers: [phone], emails: [email] }, via, token, () => {
            setState({ ...state, phone: '', email: '' });
            setSuccessMessage('Invitaion Sent Successfully');
        });
    };

    const isDefaultPool = selectedPool.name === 'default';
    return (
        <div>
            <VCERNTypography className={classes.boldText} variant="h6" value="Invite New Member" />
            <div className={classes.inviteBox}>
                <div className={classes.inviteList}>
                    <div className={classes.inviteIcon}>{icons.text}</div>
                    <VCERNTypography className={classes.grow} variant="body1" value="Invite via text" />
                    <div className={classes.inviteInput}>
                        <InputMask mask="(+1) 999 999 9999" value={phone} onChange={c => setState({ ...state, phone: c.target.value })} maskChar=" ">
                            {() => <VCERNTextField fullWidth={false} variant="outlined" placeholder="Enter Cell Phone Number" size="small" />}
                        </InputMask>
                    </div>
                    <VCERNButton value="Send." size="small" startIcon={icons.send} onClick={() => handleInviteTojoin('sms')} />
                </div>
                <div className={classes.inviteList}>
                    <div className={classes.inviteIcon}>{icons.email}</div>
                    <VCERNTypography className={classes.grow} variant="body1" value="Invite via Email" />
                    <VCERNTextField
                        fullWidth={false}
                        variant="outlined"
                        className={classes.inviteInput}
                        placeholder="Enter Email Address"
                        value={email}
                        name="email"
                        onChange={handleOnChange}
                        size="small"
                    />
                    <VCERNButton value="Send." size="small" startIcon={icons.send} onClick={() => handleInviteTojoin('email')} />
                </div>
                <div className={classes.inviteList}>
                    <div className={classes.inviteIcon}>{icons.facebook}</div>
                    <VCERNTypography className={classes.grow} variant="body1" value="Share on Facebook" />
                    <FacebookShareButton url="google.com" quote="{title}" className="Demo__some-network__share-button">
                        <VCERNButton value="Share" size="small" startIcon={icons.share} />
                    </FacebookShareButton>
                </div>
                <div className={classes.inviteList}>
                    <div className={classes.inviteIcon}>{icons.copy}</div>
                    <VCERNTypography className={classes.grow} variant="body1" value="Shareable Link" />
                    <VCERNButton value="Copy." size="small" startIcon={icons.copy} onClick={handleCopyText} />
                </div>
            </div>

            <Grid container spacing={1} className={classes.listHeader}>
                <Grid item xs={12} md={6} lg={8}>
                    <VCERNTypography className={classes.boldText} variant="h6" value="Members List" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <VCERNTextField
                        variant="outlined"
                        icon={icons.search}
                        className={classes.input}
                        placeholder="Search members"
                        value={search}
                        name="search"
                        onChange={handleOnChange}
                    />
                </Grid>
            </Grid>
            <div className={classes.listBox}>
                {filteredPoolMembers.map((el, idx) => (
                    <div key={idx}>
                        <div className={classes.listItem}>
                            <VCERNAvatar className={classes.image} src={el?.image} onClick={() => history.push(`/member/${el?._id}`, { member: el })} />
                            <div className={classes.grow}>
                                <VCERNTypography className={classes.boldText} variant="body1" value={`${el?.first_name} ${el?.last_name}`} />
                                <VCERNTypography className={classes.boldText} variant="body2" value={`Membership ID: ${el?._id}`} />
                                <VCERNTypography className={classes.boldText} variant="body2" value={`Member Since ${getFormattedDate(el?.created)}`} customColor="#6F7F9F" />
                            </div>
                            <VCERNButton variant="outlined" value="Remove" size="small" onClick={() => handleActionClick(el?.membership_id, 'Member')} />
                        </div>
                        <Divider />
                    </div>
                ))}
            </div>

            {!isDefaultPool && <VCERNButton value="Invite members to this pool" startIcon={icons.add} className={classes.button} onClick={() => setShowMemberInviteModal(true)} />}

            <Grid container spacing={1} className={classes.listHeader}>
                <Grid item xs={12} md={6} lg={8}>
                    <VCERNTypography className={classes.boldText} variant="h6" value="Admin List" />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <VCERNButton align="right" value="Add Admin" startIcon={icons.add} onClick={() => setShowAddAdminModal(true)} />
                </Grid>
            </Grid>
            <div className={classes.listBox}>
                {admins.map((el, idx) => (
                    <>
                        <div className={classes.listItem}>
                            <VCERNAvatar className={classes.image} src={el?.image} />
                            <div className={classes.grow}>
                                <VCERNTypography className={classes.boldText} variant="body1" value={`${el?.first_name} ${el?.last_name}`} />
                                <VCERNTypography className={classes.boldText} variant="body2" value={`Membership ID: ${el?._id}`} />
                                <VCERNTypography className={classes.boldText} variant="body2" value={`Member Since ${getFormattedDate(el?.created)}`} customColor="#6F7F9F" />
                            </div>
                            <VCERNButton variant="outlined" value="Remove" size="small" onClick={() => handleActionClick(el?._id, 'Admin')} />
                        </div>
                        <Divider />
                    </>
                ))}
            </div>

            <VCERNModal
                title="Invite Member"
                open={showMemberInviteModal}
                onClose={() => setShowMemberInviteModal(false)}
                onConfirm={handleInviteAllMembers}
                buttonTittle="Invite All"
            >
                <VCERNTextField
                    variant="outlined"
                    icon={icons.search}
                    className={classes.input}
                    placeholder="Search members"
                    value={searchAllMembers}
                    name="searchAllMembers"
                    onChange={handleOnChange}
                />
                <div className={classes.listBox}>
                    {filteredMembers.map((el, idx) => (
                        <>
                            <div className={classes.listItem}>
                                <VCERNAvatar className={classes.image} src={el?.image} />
                                <div className={classes.grow}>
                                    <VCERNTypography className={classes.boldText} variant="body1" value={`${el?.first_name} ${el?.last_name}`} />
                                    <VCERNTypography className={classes.boldText} variant="body2" value={`Membership ID: ${el?._id}`} />
                                    <VCERNTypography className={classes.boldText} variant="body2" value={`Member Since ${getFormattedDate(el?.created)}`} customColor="#6F7F9F" />
                                </div>
                                <VCERNButton variant="outlined" startIcon={icons.add} value="Invite" size="small" onClick={() => handleInviteMember(el?._id)} />
                            </div>
                            <Divider />
                        </>
                    ))}
                </div>
            </VCERNModal>
            <VCERNModal title="Add Admin" open={showAddAdminModal} onClose={() => setShowAddAdminModal(false)}>
                <VCERNTextField
                    variant="outlined"
                    icon={icons.search}
                    className={classes.input}
                    placeholder="Search members"
                    value={searchAllMembers}
                    name="searchAllMembers"
                    onChange={handleOnChange}
                />
                <div className={classes.listBox}>
                    {filteredMembers.map((el, idx) => (
                        <>
                            <div className={classes.listItem}>
                                <VCERNAvatar className={classes.image} src={el?.image} />
                                <div className={classes.grow}>
                                    <VCERNTypography className={classes.boldText} variant="body1" value={`${el?.first_name} ${el?.last_name}`} />
                                    <VCERNTypography className={classes.boldText} variant="body2" value={`Membership ID: ${el?._id}`} />
                                    <VCERNTypography className={classes.boldText} variant="body2" value={`Member Since ${getFormattedDate(el?.created)}`} customColor="#6F7F9F" />
                                </div>
                                <VCERNButton variant="outlined" startIcon={icons.add} value="Add Admin" size="small" onClick={() => handleAddAdmin(el?._id)} />
                            </div>
                            <Divider />
                        </>
                    ))}
                </div>
            </VCERNModal>

            <VCERNConfirmationModal
                body={`Are you sure you want to remove this ${selectedMember?.type}?`}
                open={showConfirmationModal}
                onClose={() => setShowConfirmationModal(false)}
                onConfirm={handleRemove}
            />

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </div>
    );
}
export default connect(state => state, {
    fetchMembersNotInPool: AC.fetchMembersNotInPool,
    fetchOrganizationAdmins: AC.fetchOrganizationAdmins,
    fetchPoolMembers: AC.fetchPoolMembers,
    inviteToJoin: AC.inviteToJoin,
    makeMemberAdmin: AC.makeMemberAdmin,
    inviteToJoinPool: AC.inviteToJoinPool,
    removeOrganizationAdmin: AC.removeOrganizationAdmin,
    removeMemberFromPool: AC.removeMemberFromPool,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(Settings);
