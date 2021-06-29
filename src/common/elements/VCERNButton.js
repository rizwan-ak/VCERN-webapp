import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {},
    label: { textTransform: 'none', padding: 5 },
    contained: {
        color: '#000',
        // backgroundColor: 'rgba(0, 0, 0, 0.04)',
        // '&:hover': {
        //     backgroundColor: '#EBE9E9',
        // },
    },
    containedPrimary: { color: '#FFF' },
    containedSecondary: { color: '#FFF' },
    outlinedPrimary: { color: '#000', border: 'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' },
    outlinedSecondary: { color: '#000', border: 'none', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' },
});

const VCERNButton = props => {
    const { isHidden, value, children, width, background, rounded, align, ...otherProps } = props;
    if (isHidden) {
        return null;
    } else {
        return (
            <div style={{ textAlign: align || 'center' }}>
                <Button
                    disableElevation
                    disableRipple
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ width: width || '', background: background || '', maxWidth: 320, borderRadius: rounded ? 50 : '' }}
                    {...otherProps}
                >
                    {children || value}
                </Button>
            </div>
        );
    }
};

export default withStyles(styles)(VCERNButton);
