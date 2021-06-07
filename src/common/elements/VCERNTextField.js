import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField } from '@material-ui/core';

const styles = theme => ({});

const VCERNTextField = props => {
    const { isHidden, icon, ...otherProps } = props;

    if (isHidden) {
        return null;
    } else {
        return <TextField InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment>, inputProps: { max: '2003-05-04' } }} fullWidth {...otherProps} />;
    }
};

export default withStyles(styles)(VCERNTextField);
