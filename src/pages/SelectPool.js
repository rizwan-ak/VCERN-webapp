import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTypography from '../common/elements/VCERNTypography';

import poolImage from '../common/assets/others/pool.png';
import { AddIcon } from '../common/icons';
import { connect } from 'react-redux';

import AC from '../redux/actions/actionCreater';
import cx from 'clsx';
import constants from '../common/constants';

const useStyles = makeStyles(theme => ({
    logoBox: { marginBottom: 20 },

    logo: { height: 100, width: 100 },

    poolBox: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' },
    poolImage: { height: 175, width: 175 },
    newPoolCard: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: 175, width: 175, background: '#07A7E3', color: 'white' },
    poolCard: { margin: 25, cursor: 'pointer' },
    activePool: { outline: '5px solid #07A7E3', outlineOffset: '-5px' },
}));

function SelectPool({ setSelectedPool, fetchPools, currentUser, type, token, currentOrganization }) {
    const classes = useStyles();
    const history = useHistory();
    const [pool, setPool] = useState(0);
    const [pools, setPools] = useState([]);

    const { organization, _id } = currentUser;
    const { verified } = type === constants.USER_TYPE_MEMBER ? currentUser : currentOrganization;
    const { name } = currentOrganization;

    useEffect(() => {
        fetchPools({ organization, _id }, type, token, setPools);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!verified) return history.push('/verify');

        // eslint-disable-next-line
    }, [verified]);

    const handleSubmit = () => {
        setSelectedPool(pools[pool]);
        history.push('/dashboard');
    };

    const handleNewPool = () => {
        setPool(null);
        history.push(type === constants.USER_TYPE_MEMBER ? 'all-pools' : '/new-pool');
    };

    return (
        <div>
            <div className={classes.logoBox}>
                <VCERNTypography align="center" variant="h4" className={classes.logoText} value={name} />
            </div>
            <VCERNTypography align="center" variant="h3" className={classes.logoText} value="Select Pool" />
            <div className={classes.poolBox}>
                {pools.map((el, idx) => (
                    <div key={idx} className={cx(classes.poolCard)} onClick={() => setPool(idx)}>
                        <img src={poolImage} alt="logo" className={cx(classes.poolImage, { [classes.activePool]: idx === pool })} />
                        <VCERNTypography align="center" variant="h6" className={classes.logoText} value={el?.name} />
                    </div>
                ))}
                <div className={classes.poolCard} onClick={handleNewPool}>
                    <div className={classes.newPoolCard}>
                        <AddIcon fontSize="large" />
                    </div>
                    <VCERNTypography
                        align="center"
                        variant="h6"
                        className={classes.logoText}
                        value={type === constants.USER_TYPE_MEMBER ? 'View Pool Invites' : 'Request New Pool'}
                    />
                </div>
            </div>
            <VCERNButton fullWidth value="Next" onClick={handleSubmit} />
        </div>
    );
}
export default connect(state => state, { setSelectedPool: AC.setSelectedPool, fetchPools: AC.fetchPools })(SelectPool);
