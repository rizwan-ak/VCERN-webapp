import { Divider, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';

import VCERNAvatar from '../common/elements/VCERNAvatar';
import VCERNTypography from '../common/elements/VCERNTypography';
import { getFormattedDate } from '../common/helper';
import AC from '../redux/actions/actionCreater';

const useStyles = makeStyles(theme => ({
    image: { width: '100%', height: 400, objectFit: 'contain' },
    title: { fontWeight: 'bold', margin: '20px 0' },
    boldText: { fontWeight: 'bold' },
    inline: { display: 'flex', justifyContent: 'space-between' },
    divider: { margin: '15px 0' },
    body: { padding: '20px 0' },
    underline: { fontWeight: 'bold', textDecoration: 'underline', color: '#FE9900' },
}));

function SingleBlog({ setCurrentPageTitle }) {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    const [blog, setBlog] = useState({ author: '', date: '', description: '', image: '', link: '', title: '' });

    const { author, date, description, image, link, title } = blog;

    useEffect(() => {
        setCurrentPageTitle(`${location?.state?.title}`);
        location?.state?.title ? setBlog(location?.state) : history.push('/blogs');

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <img src={image} className={classes.image} />
            <VCERNTypography variant="h3" value={title} className={classes.title} />
            <div className={classes.inline}>
                <VCERNTypography variant="body1" value={author} className={classes.boldText} customColor="#657285" />
                <VCERNTypography variant="body1" value={getFormattedDate(date)} className={classes.boldText} customColor="#657285" />
            </div>
            <Divider className={classes.divider} />
            <VCERNTypography variant="body1" value={description} className={classes.body} customColor="#657285" />
            <a className={classes.underline} href={link} target="_blank" rel="noreferrer">
                Read More
            </a>
        </div>
    );
}
export default connect(state => state, { setCurrentPageTitle: AC.setCurrentPageTitle })(SingleBlog);
