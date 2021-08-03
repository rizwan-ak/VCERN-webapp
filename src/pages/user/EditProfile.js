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
import { citiesList, statesList } from '../../common/data';
import constants from '../../common/constants';
import AC from '../../redux/actions/actionCreater';
import VCERNAlert from '../../common/elements/VCERNAlert';

const useStyles = makeStyles(theme => ({
    input: { margin: '10px 0' },
    title: { margin: '15px 0', fontWeight: 'bold' },
    main: { margin: '20px 0', width: '100%' },
    inline: { margin: '15px 0 15px 15px', display: 'flex' },
    icon: { marginRight: 15 },
    optionText: { fontWeight: 'bold', flexGrow: 1 },
    divider: { margin: '20px 0' },
    editIcon: { cursor: 'pointer', borderRadius: '50%', background: '#E9ECF6', height: 40, width: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' },
}));

function EditProfile({ currentUser, setError, token, updateMember, updateBeneficiary, setCurrentPageTitle }) {
    const classes = useStyles();

    const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);
    const [isUppercaseIncludedInPassword, setIsUppercaseIncludedInPassword] = useState(false);
    const [isLowercaseIncludedInPassword, setIsLowercaseIncludedInPassword] = useState(false);
    const [isSpecialCharacterIncludedInPassword, setIsSpecialCharacterIncludedInPassword] = useState(false);

    const [successMessage, setSuccessMessage] = useState(false);

    const [showEditPhone, setShowEditPhone] = useState(false);
    const [showEditEmail, setShowEditEmail] = useState(false);
    const [showEditPassword, setShowEditPassword] = useState(false);
    const [showEditAddress, setShowEditAddress] = useState(false);
    const [showEditBeneficiary, setShowEditBeneficiary] = useState(false);
    const [data, setData] = useState({
        newPhone: '',
        newEmail: '',
        newState: '',
        newCity: '',
        newPassword: '',
        newApt: '',
        newStreet: '',
        b_first_name: '',
        b_last_name: '',
        b_email: '',
        b_dob: '',
        b_phone: '',
        b_relation: '',
        b_street_address: '',
        b_apt: '',
        b_state: '',
        b_city: '',
        b_zip_code: '',
    });
    const {
        newPhone,
        newEmail,
        newState,
        newCity,
        newPassword,
        newApt,
        newStreet,
        b_first_name,
        b_last_name,
        b_email,
        b_dob,
        b_phone,
        b_relation,
        b_street_address,
        b_apt,
        b_state,
        b_city,
        b_zip_code,
    } = data;

    const { phone, email, address, beneficiary } = currentUser;
    const { city, state, apt, street_address } = address;

    useEffect(() => {
        setCurrentPageTitle(`Edit Profile`);

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        resetData();

        // eslint-disable-next-line
    }, [currentUser]);

    const resetData = () => {
        const { phone, email, address, beneficiary } = currentUser;
        const { city, state, apt, street_address } = address;
        setData({
            newPhone: phone,
            newEmail: email,
            newState: state,
            newCity: city,
            newApt: apt,
            newStreet: street_address,
            b_first_name: beneficiary.first_name,
            b_last_name: beneficiary.last_name,
            b_email: beneficiary.email,
            b_dob: beneficiary.dob,
            b_phone: beneficiary.phone,
            b_relation: beneficiary.relationship,
            b_street_address: beneficiary.address.street_address,
            b_apt: beneficiary.address.apt,
            b_state: beneficiary.address.state,
            b_city: beneficiary.address.city,
            b_zip_code: beneficiary.address.zip_code,
        });
    };

    const handleSubmit = type => {
        if (!validateFields()) {
            type === 'beneficiary'
                ? updateBeneficiary(data, token, () => {
                      setSuccessMessage('User Updated Successfully');
                      resetData();
                  })
                : updateMember(data, token, () => {
                      setSuccessMessage('User Updated Successfully');
                      resetData();
                  });

            handleCloseModal();
        }
    };

    const validateFields = () => {
        if (showEditEmail && !constants.EMAIL_REGEX.test(newEmail)) {
            return setError('Please enter a valid Email.');
        } else if (
            showEditPassword &&
            (!newPassword || !isPasswordLengthValid || !isLowercaseIncludedInPassword || !isUppercaseIncludedInPassword || !isSpecialCharacterIncludedInPassword)
        ) {
            return setError('Password must be at least 8 characters with 1 upper case, 1 lower case, 1 number or special character.');
        } else if (showEditAddress && (!newStreet || !newCity || !newStreet || !newApt)) {
            return setError('Please enter all required fields.');
        } else if (
            showEditBeneficiary &&
            (!b_first_name || !b_last_name || !b_email || !b_dob || !b_phone || !b_relation || !b_street_address || !b_state || !b_city || !b_zip_code)
        ) {
            return setError('Please enter all required fields.');
        } else return false;
    };

    const handleCloseModal = () => {
        setShowEditPhone(false);
        setShowEditEmail(false);
        setShowEditPassword(false);
        setShowEditAddress(false);
        setShowEditBeneficiary(false);
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setData({ ...data, [name]: value });
        if (name === 'newPassword') {
            value.length > 7 ? setIsPasswordLengthValid(true) : setIsPasswordLengthValid(false);
            newPassword && constants.UPPERCASE_REGEX.test(value) ? setIsUppercaseIncludedInPassword(true) : setIsUppercaseIncludedInPassword(false);
            newPassword && constants.LOWERCASE_REGEX.test(value) ? setIsLowercaseIncludedInPassword(true) : setIsLowercaseIncludedInPassword(false);
            constants.SPECIAL_CHARACTER_REGEX.test(value) ? setIsSpecialCharacterIncludedInPassword(true) : setIsSpecialCharacterIncludedInPassword(false);
        }
    };

    return (
        <Grid container>
            <DashboardHeader />
            <div className={classes.main}>
                <VCERNTypography className={classes.title} variant="h6" value="Personal Details" />

                <div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.phone}</div>
                        <VCERNTypography className={classes.optionText} variant="body1" value={phone} />
                        <div className={classes.editIcon} onClick={() => setShowEditPhone(true)}>
                            {icons.edit}
                        </div>
                    </div>
                    <VCERNModal title="Edit Phone" open={showEditPhone} onClose={handleCloseModal} onConfirm={handleSubmit} buttonTittle="Update">
                        <InputMask
                            maskChar=" "
                            value={newPhone}
                            mask="(+1) 999 999 99 99"
                            className={classes.input}
                            name="testasdf"
                            onChange={evt => setData({ ...data, newPhone: evt.target.value })}
                        >
                            {() => <VCERNTextField variant="outlined" name="test" icon={icons.phone} autoFocus />}
                        </InputMask>
                    </VCERNModal>
                </div>

                <div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.email}</div>
                        <VCERNTypography className={classes.optionText} variant="body1" value={email} />
                        <div className={classes.editIcon} onClick={() => setShowEditEmail(true)}>
                            {icons.edit}
                        </div>
                    </div>
                    <VCERNModal title="Edit Email" open={showEditEmail} onClose={handleCloseModal} onConfirm={handleSubmit} buttonTittle="Update">
                        <VCERNTextField autoFocus variant="outlined" icon={icons.email} value={newEmail} name="newEmail" onChange={handleChange} />
                    </VCERNModal>
                </div>

                <div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.password}</div>
                        <VCERNTypography className={classes.optionText} variant="body1" value="Password" />
                        <div className={classes.editIcon} onClick={() => setShowEditPassword(true)}>
                            {icons.edit}
                        </div>
                    </div>
                    <VCERNModal title="Edit Password" open={showEditPassword} onClose={handleCloseModal} onConfirm={handleSubmit} buttonTittle="Update">
                        <VCERNTextField autoFocus type="password" variant="outlined" icon={icons.password} value={newPassword} name="newPassword" onChange={handleChange} />
                    </VCERNModal>
                </div>

                <div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.state}</div>
                        <VCERNTypography className={classes.optionText} variant="body1" value={`${apt}, ${street_address}, ${city}, ${state}`} />
                        <div className={classes.editIcon} onClick={() => setShowEditAddress(true)}>
                            {icons.edit}
                        </div>
                    </div>
                    <VCERNModal title="Edit Address" open={showEditAddress} onClose={handleCloseModal} onConfirm={handleSubmit} buttonTittle="Update">
                        <VCERNAutocomplete
                            variant="outlined"
                            value={newState}
                            placeholder="State *"
                            icon={icons.state}
                            options={statesList}
                            className={classes.input}
                            onChange={(evt, val) => setData({ ...data, newState: val })}
                        />
                        <VCERNAutocomplete
                            variant="outlined"
                            disabled={!newState}
                            placeholder="City/Town *"
                            value={newCity}
                            icon={icons.city}
                            options={citiesList(newState)}
                            className={classes.input}
                            onChange={(evt, val) => setData({ ...data, newCity: val })}
                        />
                        <VCERNTextField className={classes.input} placeholder="apt" variant="outlined" icon={icons.apt} value={newApt} name="newApt" onChange={handleChange} />
                        <VCERNTextField
                            className={classes.input}
                            placeholder="Street Address"
                            variant="outlined"
                            icon={icons.street}
                            value={newStreet}
                            name="newStreet"
                            onChange={handleChange}
                        />
                    </VCERNModal>
                </div>

                <div>
                    <div className={classes.inline}>
                        <div className={classes.icon}>{icons.relation}</div>
                        <VCERNTypography className={classes.optionText} variant="body1" value={`Beneficiary: ${beneficiary.relationship}`} />
                        <div className={classes.editIcon} onClick={() => setShowEditBeneficiary(true)}>
                            {icons.edit}
                        </div>
                    </div>
                    <VCERNModal
                        title="Edit Beneficiary Information"
                        open={showEditBeneficiary}
                        onClose={handleCloseModal}
                        onConfirm={() => handleSubmit('beneficiary')}
                        buttonTittle="Update"
                    >
                        <VCERNTextField
                            variant="outlined"
                            placeholder="First Name *"
                            icon={icons.person}
                            className={classes.input}
                            value={b_first_name}
                            name="b_first_name"
                            onChange={handleChange}
                        />
                        <VCERNTextField
                            variant="outlined"
                            placeholder="Last Name *"
                            icon={icons.person}
                            className={classes.input}
                            value={b_last_name}
                            name="b_last_name"
                            onChange={handleChange}
                        />
                        <VCERNTextField
                            variant="outlined"
                            placeholder="Email *"
                            icon={icons.email}
                            className={classes.input}
                            value={b_email}
                            name="b_email"
                            onChange={handleChange}
                        />
                        <VCERNTextField
                            variant="outlined"
                            type="date"
                            placeholder="Date of Birth *"
                            icon={icons.date}
                            className={classes.input}
                            value={b_dob}
                            name="b_dob"
                            onChange={handleChange}
                        />
                        <InputMask mask="(+1) 999 999 99 99" className={classes.input} value={b_phone} onChange={c => setData({ ...data, b_phone: c.target.value })} maskChar=" ">
                            {() => <VCERNTextField variant="outlined" placeholder="Phone Number *" icon={icons.phone} />}
                        </InputMask>

                        <VCERNTextField
                            variant="outlined"
                            placeholder="Relationship *"
                            icon={icons.relation}
                            className={classes.input}
                            value={b_relation}
                            name="b_relation"
                            onChange={handleChange}
                        />

                        <VCERNTypography variant="h6" className={classes.title} value="Address" />

                        <VCERNTextField
                            variant="outlined"
                            placeholder="Street address *"
                            icon={icons.street}
                            className={classes.input}
                            value={b_street_address}
                            name="b_street_address"
                            onChange={handleChange}
                        />
                        <VCERNTextField variant="outlined" placeholder="APT" icon={icons.apt} className={classes.input} value={b_apt} name="b_apt" onChange={handleChange} />
                        <VCERNAutocomplete
                            variant="outlined"
                            placeholder="State *"
                            icon={icons.state}
                            value={b_state}
                            options={statesList}
                            className={classes.input}
                            onChange={(evt, val) => setData({ ...data, b_state: val })}
                        />
                        <VCERNAutocomplete
                            variant="outlined"
                            disabled={!b_state}
                            placeholder="City/Town *"
                            icon={icons.city}
                            value={b_city}
                            options={citiesList(b_state)}
                            className={classes.input}
                            onChange={(evt, val) => setData({ ...data, b_city: val })}
                        />
                        <InputMask mask="99999-9999" className={classes.input} value={b_zip_code} onChange={c => setData({ ...data, b_zip_code: c.target.value })} maskChar={null}>
                            {() => <VCERNTextField variant="outlined" placeholder="Zip Code *" icon={icons.zip} />}
                        </InputMask>
                    </VCERNModal>
                </div>
            </div>

            <VCERNAlert message={successMessage} onClose={() => setSuccessMessage(false)} success={true} />
        </Grid>
    );
}
export default connect(data => data, {
    setError: AC.setError,
    updateMember: AC.updateMember,
    updateBeneficiary: AC.updateBeneficiary,
    setCurrentPageTitle: AC.setCurrentPageTitle,
})(EditProfile);
