import React from 'react';
import VCERNTypography from '../../common/elements/VCERNTypography';
import VCERNTextField from '../../common/elements/VCERNTextField';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import icons from '../../common/icons';
import VCERNButton from '../../common/elements/VCERNButton';

import VCERNImageUpload from '../../common/elements/VCERNImageUpload';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import AC from '../../redux/actions/actionCreater';
import VCERNAlert from '../../common/elements/VCERNAlert';
import { getRoles } from '../../common/data';

const useStyles = makeStyles(theme => ({
    input: { margin: '5px 0' },
    title: { margin: '15px 0', fontWeight: 'bold' },
    boldText: { fontWeight: 'bold' },
    button: { margin: '30px 0 20px 0' },
    uploadBox: { display: 'flex', alignItems: 'center', margin: '15px 0' },
    uploadTitleIcon: { marginRight: 15 },
    image: { height: 138, width: 153 },
    imagesBox: { display: 'flex', justifyContent: 'space-around' },
    imageBox: { display: 'flex', alignItems: 'center', flexDirection: 'column' },
}));

function Settings({ currentOrganization, getPreSignedLink, uploadFile, customizeOrganization, token, type, setCurrentPageTitle }) {
    const classes = useStyles();

    const [state, setState] = useState({ name: '', tagline: '', description: '', image: '', about_image: '', tempimage: '', tempabout_image: '' });
    const { name, tagline, description, image, about_image, setError, tempimage, tempabout_image } = state;
    const [successMessage, setSuccessMessage] = useState(false);

    const handleOnChange = evt => {
        const { name, value } = evt.target;
        setState({ ...state, [name]: value });
    };

    useEffect(() => {
        setCurrentPageTitle(`${getRoles[type]} Settings`);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setState({ ...currentOrganization });
    }, [currentOrganization]);

    const handleAttachment = evt => {
        const file = evt.target.files[0];
        const fileName = evt.target.name;

        if (file) {
            const { name, type } = file;
            getPreSignedLink({ name, type }, url =>
                uploadFile({ url, file, type }, () => setState({ ...state, [`temp${fileName}`]: URL.createObjectURL(file), [fileName]: url.split('?')[0] })),
            );
        }
    };

    const handleSubmit = () => {
        if (!name || !tagline || !description || !image || !about_image) return setError('Please enter all required fileds.');
        customizeOrganization(state, state?._id, token, () => {
            setState({ name: '', tagline: '', description: '', image: '', about_image: '', tempimage: '', tempabout_image: '' });
            setSuccessMessage(`Organization Updated Successfully`);
        });
    };

    return (
        <div>
            <VCERNTypography className={classes.title} variant="h6" value="Organization Name" />
            <VCERNTextField variant="outlined" className={classes.input} placeholder="Organization Name" value={name} name="name" onChange={handleOnChange} />
            <VCERNTypography className={classes.title} variant="h6" value="Tagline" />
            <VCERNTextField variant="outlined" className={classes.input} placeholder="Tagline" value={tagline} name="tagline" onChange={handleOnChange} />
            <VCERNTypography className={classes.title} variant="h6" value="Description" />
            <VCERNTextField
                multiline
                rows={5}
                variant="outlined"
                className={classes.input}
                placeholder="Membership ID"
                value={description}
                name="description"
                onChange={handleOnChange}
            />
            <div className={classes.uploadBox}>
                <div className={classes.uploadTitleIcon}>{icons.submit}</div>
                <div>
                    <VCERNTypography className={classes.boldText} variant="h6" value="Upload Images" />
                    <VCERNTypography value="Logo Should be Square." customColor="#6F7F9F" />
                </div>
            </div>
            <div className={classes.imagesBox}>
                <VCERNImageUpload title="Organization Logo" name="image" onSelect={handleAttachment} image={tempimage || image} />
                <VCERNImageUpload title="About Us Image" name="about_image" onSelect={handleAttachment} image={tempabout_image || about_image} />
            </div>
            <VCERNButton fullWidth value="Save Changes" startIcon={icons.save} className={classes.button} onClick={handleSubmit} />

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </div>
    );
}
export default connect(state => state, {
    getPreSignedLink: AC.getPreSignedLink,
    uploadFile: AC.uploadFile,
    setError: AC.setError,
    customizeOrganization: AC.customizeOrganization,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(Settings);
