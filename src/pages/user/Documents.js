import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import VCERNTypography from '../../common/elements/VCERNTypography';

import { connect } from 'react-redux';
import icons from '../../common/icons';
import DashboardHeader from '../../common/DashboardHeader';
import InputMask from 'react-input-mask';
import VCERNModal from '../../common/elements/VCERNModal';
import VCERNTextField from '../../common/elements/VCERNTextField';
import VCERNAutocomplete from '../../common/elements/VCERNAutocomplete';
import constants from '../../common/constants';
import AC from '../../redux/actions/actionCreater';
import { getFormattedDate } from '../../common/helper';
import VCERNAvatar from '../../common/elements/VCERNAvatar';

import docsImage from '../../common/assets/others/docsImage.png';
import idImage from '../../common/assets/others/idImage.png';
import profileImage from '../../common/assets/others/profileImage.png';
import DocumentsList from '../../common/DocumentsList';
import VCERNAlert from '../../common/elements/VCERNAlert';

const useStyles = makeStyles(theme => ({
    title: { margin: '15px 0', fontWeight: 'bold' },
    docImage: { width: 125, height: 112.7, cursor: 'pointer' },
    link: { display: 'contents' },
}));

function Documents({ currentUser, fetchDocs, token, uploadFile, getPreSignedLink, addDoc }) {
    const classes = useStyles();

    const [successMessage, setSuccessMessage] = useState(false);
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        fetchDocs(currentUser?._id, token, setDocs);
    }, []);

    const handleAttachment = evt => {
        const file = evt.target.files[0];

        if (file) {
            const { name, type } = file;
            getPreSignedLink({ name, type }, url =>
                uploadFile({ url, file, type }, () => {
                    addDoc({ file: url.split('?')[0], type: type.split('/')[0] }, token, val => {
                        setSuccessMessage('File Uploaded Successfully.');
                        fetchDocs(currentUser?._id, token, setDocs);
                        setDocs([...docs, val]);
                    });
                }),
            );
        }
    };

    return (
        <div>
            <VCERNTypography className={classes.title} variant="h6" value="Upload Documents" />
            <Grid container spacing={3}>
                <Grid item sm={6} md={3} lg={2}>
                    <label htmlFor="upload-photo" className={classes.link}>
                        <VCERNAvatar className={classes.docImage} variant="rounded" src={profileImage} />
                    </label>
                    <input id="upload-photo" type="file" name="id" accept="image/*" style={{ display: 'none' }} onChange={handleAttachment} />
                </Grid>
                <Grid item sm={6} md={3} lg={2}>
                    <label htmlFor="upload-photo" className={classes.link}>
                        <VCERNAvatar className={classes.docImage} variant="rounded" src={idImage} />
                    </label>
                    <input id="upload-photo" type="file" name="image" accept="image/*" style={{ display: 'none' }} onChange={handleAttachment} />
                </Grid>
                <Grid item sm={6} md={3} lg={2}>
                    <label htmlFor="upload-docs" className={classes.link}>
                        <VCERNAvatar className={classes.docImage} variant="rounded" src={docsImage} />
                    </label>
                    <input id="upload-docs" type="file" name="docs" style={{ display: 'none' }} onChange={handleAttachment} />
                </Grid>
            </Grid>

            <VCERNTypography className={classes.title} variant="h6" value="Documents" />
            <DocumentsList docs={docs} />

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </div>
    );
}
export default connect(data => data, { fetchDocs: AC.fetchDocs, uploadFile: AC.uploadFile, getPreSignedLink: AC.getPreSignedLink, addDoc: AC.addDoc })(Documents);