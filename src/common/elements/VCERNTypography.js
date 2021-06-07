import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

const VCERNTypography = props => {
    const { classes, isHidden, value, children, customColor, className, ...otherProps } = props;

    if (isHidden) {
        return null;
    } else {
        return (
            <Typography variant="contained" className={className} classes={classes} {...otherProps} style={{ color: customColor }}>
                {children || value}
            </Typography>
        );
    }
};

export default withStyles(styles)(VCERNTypography);
