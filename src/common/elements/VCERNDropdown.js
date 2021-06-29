import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem, Select } from '@material-ui/core';

const styles = theme => ({});

const VCERNDropdown = props => {
    const { isHidden, options, ...otherProps } = props;

    if (isHidden) {
        return null;
    } else {
        return (
            <Select fullWidth variant="outlined" {...otherProps}>
                {options.map((el, idx) => (
                    <MenuItem key={idx} value={el.value}>
                        {el.title}
                    </MenuItem>
                ))}
            </Select>
        );
    }
};

export default withStyles(styles)(VCERNDropdown);
