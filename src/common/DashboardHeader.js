import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import cx from 'clsx';
import VCERNTypography from './elements/VCERNTypography';
import VCERNGroupAvatar from './elements/VCERNGroupAvatar';
import VCERNAvatar from './elements/VCERNAvatar';
import icons from './icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import constants from './constants';
import VCERNDropdown from './elements/VCERNDropdown';
import AC from '../redux/actions/actionCreater';
import VCERNAlert from './elements/VCERNAlert';

const useStyles = makeStyles(theme => ({
    coverBox: { background: '#05C6BD', borderRadius: 5, height: 200, [theme.breakpoints.down('sm')]: { height: 125 } },
    coverPic: { height: '100%', width: '100%' },

    infoBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    infoPic: {
        height: 150,
        width: 150,
        borderRadius: '50%',
        border: '2px solid white',
        margin: '-60px 20px 0 30px',
        [theme.breakpoints.down('sm')]: { margin: '-50px 10px 0 10px', height: 100, width: 100 },
    },
    infoTitle: { fontWeight: 'bold', maxWidth: 400 },
    infoSettingsBox: {
        background: 'white',
        color: '6F7F9F',
        borderRadius: 5,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        cursor: 'pointer',
    },

    hideOnSm: { [theme.breakpoints.down('sm')]: { display: 'none' } },
    grow: { flexGrow: 1 },

    boldText: { fontWeight: 'bold' },

    marginLeft: { marginLeft: 16 },
}));

function DashboardHeader({
    currentOrganization,
    type,
    currentUser,
    title,
    subTitle,
    fetchPools,
    token,
    setSelectedPool,
    fetchMembersDataByPool,
    selectedPool,
    id,
    updateMember,
    uploadFile,
    getPreSignedLink,
    setError,
}) {
    const classes = useStyles();
    const history = useHistory();

    const [pools, setPools] = useState([]);
    const [members, setMembers] = useState(null);

    const [successMessage, setSuccessMessage] = useState(false);

    useEffect(() => {
        isAdmin && fetchPools({ organization: currentOrganization?._id }, 'organization', token, setPools);
        (isAdmin || isOrganization) && fetchMembersDataByPool(selectedPool?._id, token, setMembers);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        !!pools.length && setSelectedPool(pools[0]);

        // eslint-disable-next-line
    }, [pools]);

    const handleChange = evt => {
        setSelectedPool(...pools.filter(el => el.name === evt.target.value));
    };

    const handleAttachment = evt => {
        const file = evt.target.files[0];

        if (file?.size > 5242880) return setError('You cannot uploade a file greater than 5MB.');

        if (file) {
            const { name, type } = file;
            getPreSignedLink({ name, type }, url =>
                uploadFile({ url, file, type }, () => {
                    updateMember({ image: url.split('?')[0] }, token, () => {
                        setSuccessMessage('User Updated Successfully');
                    });
                }),
            );
        }
    };
    const isEditable = history.location.pathname === '/edit-profile';

    const isOrganization = type === constants.USER_TYPE_ORG;
    const isAdmin = type === constants.USER_TYPE_VCERN;
    const isMember = type === constants.USER_TYPE_MEMBER;

    const image = isMember ? currentUser?.image : currentOrganization?.image;
    const memberId = id || (isMember ? currentUser?._id : '');
    const name = title || (isMember ? `${currentUser?.first_name} ${currentUser?.last_name}` : currentOrganization?.name);

    const tagline = subTitle || (isMember ? `${currentUser?.address?.city}, ${currentUser?.address?.state}` : currentOrganization?.tagline);

    return (
        <Grid item xs={12}>
            <div className={classes.coverBox} />
            <div className={classes.infoBox}>
                {isEditable ? (
                    <>
                        <label htmlFor="upload-photo">
                            <VCERNAvatar src={image} className={classes.infoPic} style={{ cursor: 'pointer' }} />
                        </label>
                        <input id="upload-photo" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAttachment} />
                    </>
                ) : (
                    <VCERNAvatar src={image} alt="Died Person" className={classes.infoPic} />
                )}
                <div className={cx(classes.hideOnSm, classes.grow)}>
                    <VCERNTypography className={classes.infoTitle} variant="h5" value={name} />
                    <VCERNTypography className={classes.infoTitle} variant="body1" value={`Membership ID: ${memberId}`} customColor="#657285" />
                    <VCERNTypography className={classes.infoTitle} variant="body1" customColor="#657285" value={tagline} />
                </div>
                {members && isOrganization && <VCERNGroupAvatar className={cx(classes.hideOnSm)} members={members?.members} />}
                {members && (isOrganization || isAdmin) && (
                    <VCERNTypography className={cx(classes.boldText, classes.hideOnSm)} variant="body1" value={` ${members?.total_number_of_members} Members`} />
                )}
                {isAdmin ? (
                    <VCERNDropdown
                        color="secondary"
                        className={classes.marginLeft}
                        onChange={handleChange}
                        fullWidth={false}
                        options={pools.map(el => ({ title: el?.name, value: el?.name, idx: 2 }))}
                    />
                ) : (
                    <div className={cx(classes.infoSettingsBox)} onClick={() => history.push('/settings')}>
                        {icons.settings}
                    </div>
                )}
            </div>

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </Grid>
    );
}
export default connect(state => state, {
    fetchPools: AC.fetchPools,
    setSelectedPool: AC.setSelectedPool,
    fetchMembersDataByPool: AC.fetchMembersDataByPool,
    getPreSignedLink: AC.getPreSignedLink,
    uploadFile: AC.uploadFile,
    updateMember: AC.updateMember,
    setError: AC.setError,
})(DashboardHeader);
