import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import cx from 'clsx';
import VCERNTypography from './elements/VCERNTypography';
import VCERNGroupAvatar from './elements/VCERNGroupAvatar';
import VCERNAvatar from './elements/VCERNAvatar';
import icons from './icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import constants from './constants';

const useStyles = makeStyles(theme => ({
    coverBox: { background: '#05C6BD', borderRadius: 5, height: 350, [theme.breakpoints.down('sm')]: { height: 200 } },
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
    infoTitle: { fontWeight: 'bold', maxWidth: 320 },
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
    },

    hideOnSm: { [theme.breakpoints.down('sm')]: { display: 'none' } },
    grow: { flexGrow: 1 },

    boldText: { fontWeight: 'bold' },
}));

function DashboardHeader({ currentOrganization, type, currentUser, title, subTitle }) {
    const classes = useStyles();
    const history = useHistory();

    const image = type === constants.USER_TYPE_MEMBER ? currentUser?.image : currentOrganization?.image;
    const name = title || (type === constants.USER_TYPE_MEMBER ? `${currentUser?.first_name} ${currentUser?.last_name}` : currentOrganization?.name);

    const tagline = subTitle || 'Tagline goes here. ';

    const isOrganization = type === constants.USER_TYPE_ORG;

    return (
        <Grid item xs={12}>
            <div className={classes.coverBox}>{/* <img src={giftPic} alt="Died Person" className={classes.coverPic} /> */}</div>
            <div className={classes.infoBox}>
                <VCERNAvatar src={image} alt="Died Person" className={classes.infoPic} />
                <div className={cx(classes.hideOnSm, classes.grow)}>
                    <VCERNTypography className={classes.infoTitle} variant="h5" value={name} />
                    <VCERNTypography className={classes.infoTitle} variant="body1" customColor="#657285" value={tagline} />
                </div>
                {isOrganization && <VCERNGroupAvatar className={cx(classes.hideOnSm)} />}
                {isOrganization && <VCERNTypography className={cx(classes.boldText, classes.hideOnSm)} variant="body1" value="1.2K members" />}
                <div className={cx(classes.infoSettingsBox)} onClick={() => history.push('/settings')}>
                    {icons.settings}
                </div>
            </div>
        </Grid>
    );
}
export default connect(state => state)(DashboardHeader);
