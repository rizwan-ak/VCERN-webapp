import { Divider, Grid, makeStyles, Paper, Table, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNTypography from './elements/VCERNTypography';
import VCERNAvatar from './elements/VCERNAvatar';

import { connect } from 'react-redux';
import AC from '../redux/actions/actionCreater';
import { TableBody } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    paper: { padding: theme.spacing(2), display: 'flex', flexDirection: 'column' },
    title: { fontWeight: 'bold', marginBottom: 10 },
    divider: { marginTop: 10 },
    pic: { height: 40, width: 40, cursor: 'pointer' },
}));

function Dashboard({ fetchOrganizations, organizations, setCurrentOrganization, goToOrg }) {
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        fetchOrganizations();
    }, []);

    useEffect(() => {
        setCurrentOrganization(organizations[0]);
    }, [organizations]);

    const handleOrgClicked = org => {
        setCurrentOrganization(org);
        history.push(goToOrg ? '/organizations-history' : '/organization');
    };
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <VCERNTypography variant="h6" className={classes.title} value="Organizations" />

                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Members</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map((el, idx) => (
                            <TableRow key={idx}>
                                <TableCell>
                                    <VCERNAvatar className={classes.pic} src={el?.image} onClick={() => handleOrgClicked(el)} />
                                </TableCell>
                                <TableCell>{el?.name}</TableCell>
                                <TableCell>{el?.number_of_members}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Grid>
    );
}
export default connect(state => state, { fetchOrganizations: AC.fetchOrganizations, setCurrentOrganization: AC.setCurrentOrganization })(Dashboard);
