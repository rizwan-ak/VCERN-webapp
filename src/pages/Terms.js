import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import logo from '../common/assets/logos/blue.png';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTypography from '../common/elements/VCERNTypography';

import { tosList } from '../common/data';

const useStyles = makeStyles(theme => ({
    logoBox: {
        padding: '40px',
        [theme.breakpoints.down('sm')]: { padding: '40px 0', display: 'flex', justifyContent: 'center' },
    },

    root: { margin: '0 auto', width: '60vw', [theme.breakpoints.down('sm')]: { width: '85vw' } },
    logo: { height: 100, width: 100 },

    listBox: { margin: '30px 0', alignSelf: 'center' },
    list: { marginBottom: 10 },
    buttonBox: { width: '100%', display: 'flex', justifyContent: 'space-between', margin: '30px 0' },
}));

export default function Terms() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <div className={classes.logoBox}>
                <img src={logo} alt="logo" className={classes.logo} />
            </div>
            <div className={classes.root}>
                <VCERNTypography align="center" variant="h3" className={classes.logoText} value="Terms of Services" />
                <ul className={classes.listBox}>
                    {tosList.map((el, idx) => (
                        <VCERNTypography key={idx} variant="body1" component="li" className={classes.list} value={el} />
                    ))}
                </ul>

                <div className={classes.buttonBox}>
                    <VCERNButton fullWidth value="Decline" color="secondary" width="46%" onClick={() => history.push('/login')} />
                    <VCERNButton fullWidth value="Accept" width="46%" onClick={() => history.push('/login')} />
                </div>
            </div>
        </div>
    );
}
