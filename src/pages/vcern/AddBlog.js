import React from 'react';
import VCERNTypography from '../../common/elements/VCERNTypography';
import VCERNTextField from '../../common/elements/VCERNTextField';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import icons from '../../common/icons';
import VCERNButton from '../../common/elements/VCERNButton';

import VCERNImageUpload from '../../common/elements/VCERNImageUpload';
import AC from '../../redux/actions/actionCreater';
import VCERNAlert from '../../common/elements/VCERNAlert';
import { connect } from 'react-redux';
import { useEffect } from 'react';

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

function AddBlog({ getPreSignedLink, uploadFile, addBlog, token, setError, setCurrentPageTitle }) {
    const classes = useStyles();

    const [state, setState] = useState({ title: '', author: '', description: '', image: '', link: '', tempImage: '' });
    const [successMessage, setSuccessMessage] = useState(false);
    const { title, author, description, image, link, tempImage } = state;

    useEffect(() => {
        setCurrentPageTitle('Add Article');

        // eslint-disable-next-line
    }, []);

    const handleOnChange = evt => {
        const { name, value } = evt.target;
        setState({ ...state, [name]: value });
    };

    const handleAttachment = evt => {
        const file = evt.target.files[0];
        if (file) {
            const { name, type } = file;
            getPreSignedLink({ name, type }, url => uploadFile({ url, file, type }, () => setState({ ...state, tempImage: URL.createObjectURL(file), image: url.split('?')[0] })));
        }
    };

    const handleSubmit = () => {
        if (!title || !author || !description || !image || !link) return setError('Please enter all required fileds.');
        addBlog(state, token, () => {
            setState({ title: '', author: '', description: '', image: '', link: '', tempImage: '' });
            setSuccessMessage(`New Article Added Successfully`);
        });
    };

    return (
        <div>
            <VCERNTypography className={classes.title} variant="h6" value="Article Name" />
            <VCERNTextField variant="outlined" className={classes.input} placeholder="Article Name" value={title} name="title" onChange={handleOnChange} />
            <VCERNTypography className={classes.title} variant="h6" value="Author Name" />
            <VCERNTextField variant="outlined" className={classes.input} placeholder="Author Name" value={author} name="author" onChange={handleOnChange} />
            <VCERNTypography className={classes.title} variant="h6" value="Actual Link of the Blog" />
            <VCERNTextField variant="outlined" className={classes.input} placeholder="https://www.test.com" value={link} name="link" onChange={handleOnChange} />
            <VCERNTypography className={classes.title} variant="h6" value="Description" />
            <VCERNTextField
                multiline
                rows={5}
                variant="outlined"
                className={classes.input}
                placeholder="Short Description goes here...  e.g.  purpose of article"
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
                <VCERNImageUpload image={tempImage} name="image" onSelect={handleAttachment} />
            </div>
            <VCERNButton fullWidth value="Save Changes" startIcon={icons.save} className={classes.button} onClick={handleSubmit} />

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </div>
    );
}
export default connect(state => state, {
    getPreSignedLink: AC.getPreSignedLink,
    uploadFile: AC.uploadFile,
    addBlog: AC.addBlog,
    setError: AC.setError,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(AddBlog);
