import { Divider, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import icons from '../../common/icons';
import DashboardHeader from '../../common/DashboardHeader';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    title: { margin: '15px 0', fontWeight: 'bold' },
    main: { margin: '20px 0', width: '100%' },
    inline: { margin: '15px 0 15px 15px', display: 'flex', alignItems: 'center' },
    icon: { marginRight: 15 },
    optionText: { fontWeight: 'bold', flexGrow: 1 },
    divider: { margin: '20px 0' },
    goIcon: { cursor: 'pointer' },
}));

function Settings({}) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container>
            <DashboardHeader />
            <div className={classes.main}>
                <VCERNTypography className={classes.title} variant="h6" value="Transactions" />
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.dollar}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Payment History" />
                    <div className={classes.goIcon} onClick={() => history.push('/payments')}>
                        {icons.arrowRight}
                    </div>
                </div>
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.zip}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Payment Methods" />
                    <div className={classes.goIcon} onClick={() => history.push('/payments')}>
                        {icons.arrowRight}
                    </div>
                </div>

                <Divider className={classes.divider} />

                <VCERNTypography className={classes.title} variant="h6" value="General" />
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.eye}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="View Profile" />
                    <div className={classes.goIcon} onClick={() => history.push('/profile')}>
                        {icons.arrowRight}
                    </div>
                </div>
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.settings}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Edit Profile" />
                    <div className={classes.goIcon} onClick={() => history.push('/edit-profile')}>
                        {icons.arrowRight}
                    </div>
                </div>
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.uploadDocs}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="View/Upload Docs & Pics" />
                    <div className={classes.goIcon} onClick={() => history.push('/documents')}>
                        {icons.arrowRight}
                    </div>
                </div>
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.share}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Invite Friends" />
                    <div className={classes.goIcon} onClick={() => history.push('/invite')}>
                        {icons.arrowRight}
                    </div>
                </div>

                <Divider className={classes.divider} />

                <VCERNTypography className={classes.title} variant="h6" value="F.A.Q ?" />
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.blogs}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Terms & Conditions" />
                    <div className={classes.goIcon} onClick={() => history.push('/payment-agreements')}>
                        {icons.arrowRight}
                    </div>
                </div>
                <div className={classes.inline}>
                    <div className={classes.icon}>{icons.blogs}</div>
                    <VCERNTypography className={classes.optionText} variant="body1" value="Privacy Policy" />
                    <div className={classes.goIcon} onClick={() => history.push('/terms-and-conditions')}>
                        {icons.arrowRight}
                    </div>
                </div>
            </div>
        </Grid>
    );
}
export default connect(state => state, {})(Settings);
