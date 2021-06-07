import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';

function VCERNAlert({ message, onClose, success }) {
    return (
        <Snackbar open={!!message} autoHideDuration={3000} onClose={onClose}>
            <MuiAlert elevation={6} variant="filled" severity={success ? 'success' : 'error'}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}
export default connect(state => state, {})(VCERNAlert);
