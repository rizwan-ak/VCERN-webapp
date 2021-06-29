import React from 'react';
import VCERNTypography from '../../common/elements/VCERNTypography';
import { makeStyles } from '@material-ui/core';

import uploadImage from '../../common/assets/others/uploadImage.png';
import VCERNAvatar from '../../common/elements/VCERNAvatar';

const useStyles = makeStyles(theme => ({
    title: { margin: '15px 0', fontWeight: 'bold' },
    image: { height: 138, width: 153, cursor: 'pointer' },
    imageBox: { display: 'flex', alignItems: 'center', flexDirection: 'column' },
}));

export default function VCERNImageUpload({ image, onSelect, name, title }) {
    const classes = useStyles();

    return (
        <div className={classes.imageBox}>
            <label htmlFor={name}>
                <VCERNAvatar variant="rounded" src={image || uploadImage} className={classes.image} />
            </label>
            <input id={name} type="file" name={name} accept="image/*" style={{ display: 'none' }} onChange={onSelect} />
            {title && <VCERNTypography className={classes.title} variant="h6" value={title} />}
        </div>
    );
}
