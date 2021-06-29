import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';

export default function VCERNAutocomplete(props) {
    const { isHidden, icon, label, ...otherProps } = props;

    if (isHidden) {
        return null;
    } else {
        return (
            <Autocomplete
                {...otherProps}
                fullWidth
                renderInput={params => (
                    <TextField
                        label={label}
                        {...params}
                        {...props}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <>
                                    {icon}
                                    {params.InputProps.startAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        );
    }
}
