import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import constants from '../common/constants';
import VCERNButton from '../common/elements/VCERNButton';
import VCERNTextField from '../common/elements/VCERNTextField';
import BlogCard from '../common/BlogCard';
import icons from '../common/icons';
import AC from '../redux/actions/actionCreater';

const useStyles = makeStyles(theme => ({
    listHeader: { margin: '10px 0' },
}));

function Blogs({ type, fetchBlogs, token }) {
    const classes = useStyles();
    const history = useHistory();

    const [search, setSearch] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);

    useEffect(() => {
        fetchBlogs(token, setBlogs);
    }, []);

    useEffect(() => {
        setFilteredBlogs(blogs.filter(el => el?.title.toLowerCase().includes(search.toLowerCase())));
    }, [search.length]);

    useEffect(() => {
        setFilteredBlogs(blogs);
    }, [blogs]);

    return (
        <div>
            {type === constants.USER_TYPE_MEMBER ? (
                <VCERNTextField
                    variant="outlined"
                    icon={icons.search}
                    className={classes.input}
                    placeholder="Search Blog"
                    value={search}
                    name="search"
                    onChange={evt => setSearch(evt.target.value)}
                />
            ) : (
                <Grid container spacing={1} className={classes.listHeader}>
                    <Grid item xs={12} md={6} lg={4}>
                        <VCERNTextField
                            variant="outlined"
                            icon={icons.search}
                            className={classes.input}
                            placeholder="Search Blog"
                            value={search}
                            name="search"
                            onChange={evt => setSearch(evt.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={8}>
                        <VCERNButton value="Add Admin" startIcon={icons.add} onClick={() => history.push('/add-blog')} align="right" />
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={3} className={classes.listHeader}>
                {filteredBlogs.map((el, idx) => (
                    <Grid item key={idx} xs={12} md={4} lg={3}>
                        <BlogCard blog={el} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default connect(state => state, { fetchBlogs: AC.fetchBlogs })(Blogs);
