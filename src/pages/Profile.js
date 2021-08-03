import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNTypography from '../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import icons from '../common/icons';
import DashboardHeader from '../common/DashboardHeader';
import constants from '../common/constants';
import AC from '../redux/actions/actionCreater';
import { getFormattedDate } from '../common/helper';
import DocumentsList from '../common/DocumentsList';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    input: { margin: '10px 0' },
    title: { margin: '15px 0', fontWeight: 'bold' },
    boldText: { fontWeight: 'bold' },
    main: { margin: '20px 0', width: '100%' },
    inline: { margin: '10px 0 10px 10px', display: 'flex' },
    icon: { marginRight: 15 },
    docImage: { width: 125, height: 112.7 },
}));

function Profile({ currentUser, type, setCurrentPageTitle }) {
    const classes = useStyles();
    const location = useLocation();

    const [state, setstate] = useState({});

    useEffect(() => {
        setCurrentPageTitle(`Member Profile`);
        type === constants.USER_TYPE_MEMBER ? setstate(currentUser) : setstate(location.state.member);

        // eslint-disable-next-line
    }, []);

    const tagline = `${state?.address?.city}, ${state?.address?.state}`;
    const name = `${state?.first_name} ${state?.last_name}`;
    const phone = state?.phone;
    const email = state?.email;
    const address = `${state?.address?.apt ? state?.address?.apt + ', ' : ''}${state?.address?.street_address}, ${state?.address?.city}, ${state?.address?.state}`.trim();
    const bName = `${state?.beneficiary?.first_name} ${state?.beneficiary?.last_name}`;
    const bDob = state?.beneficiary?.dob;
    const bPhone = state?.beneficiary?.phone;
    const bAddress = `${state?.beneficiary?.address?.apt ? state?.beneficiary?.address?.apt + ', ' : ''}${state?.beneficiary?.address?.street_address}, ${
        state?.beneficiary?.address?.city
    }, ${state?.beneficiary?.address?.state}`.trim();

    return (
        <Grid container>
            <DashboardHeader title={name} subTitle={tagline} />
            <div className={classes.main}>
                <div>
                    <VCERNTypography className={classes.title} variant="h6" value="Personal Info" />
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.phone}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={phone} />
                    </div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.email}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={email} />
                    </div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.state}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={address} />
                    </div>
                </div>

                <div>
                    <VCERNTypography className={classes.title} variant="h6" value="Beneficiary Info" />
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.profile}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={bName} />
                    </div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.date}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={getFormattedDate(bDob)} />
                    </div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.phone}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={bPhone} />
                    </div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.state}</div>
                        <VCERNTypography className={classes.boldText} variant="body1" value={bAddress} />
                    </div>
                </div>

                <div>
                    <VCERNTypography className={classes.title} variant="h6" value="Documents" />
                    <DocumentsList docs={[1, 1, 1, 1, 1, 1]} />
                </div>
            </div>
        </Grid>
    );
}
export default connect(data => data, { setCurrentPageTitle: AC.setCurrentPageTitle })(Profile);
