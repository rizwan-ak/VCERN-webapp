import API from '../../common/api';
import constants from '../../common/constants';

const setLoading = payload => ({ type: constants.SET_LOADING, payload });

const setError = payload => ({ type: constants.SET_ERROR, payload });

const setUserType = payload => ({ type: constants.SET_USER_TYPE, payload });

const login = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.login(data, type, error => dispatch(setError(error)));
        if (result) {
            dispatch({ type: constants.LOGIN, payload: result });
            callback();
        }
        dispatch(setLoading(false));
    };
};

const register = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result =
            type === constants.USER_TYPE_MEMBER
                ? await API.userRegister(data, error => dispatch(setError(error)))
                : await API.organizationRegister(data, error => dispatch(setError(error)));
        if (result) {
            dispatch({ type: constants.LOGIN, payload: result });
            callback();
        }
        dispatch(setLoading(false));
    };
};

const fetchOrganizations = () => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchOrganizations(error => dispatch(setError(error)));
        result && dispatch({ type: constants.SET_ORGANIZATIONS, payload: result });
        dispatch(setLoading(false));
    };
};

const forgotPassword = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.forgotPassword(data, type, error => dispatch(setError(error)));
        if (result) {
            dispatch({ type: constants.LOGIN, payload: result });
            callback();
        }
        dispatch(setLoading(false));
    };
};

const resetPassword = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.resetPassword(data, type, error => dispatch(setError(error)));
        result && callback();
        dispatch(setLoading(false));
    };
};

const logout = () => ({ type: constants.LOGIN, payload: { user: null, token: '' } });

const verify = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.verify(data, type, error => dispatch(setError(error)));
        console.log(`result`, result);
        if (result) {
            dispatch({ type: constants.LOGIN, payload: result });
            callback();
        }
        dispatch(setLoading(false));
    };
};

const sendVerificationCode = (data, type, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.sendVerificationCode(data, type, error => dispatch(setError(error)));
        result && callback();
        dispatch(setLoading(false));
    };
};

const getPreSignedLink = (data, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.getPreSignedLink(data, error => dispatch(setError(error)));
        result && callback(result);
    };
};

const uploadFile = (data, callback) => {
    return async dispatch => {
        const result = await API.uploadFile(data, error => dispatch(setError(error)));
        result && callback();
        dispatch(setLoading(false));
    };
};

const AC = {
    login,
    setUserType,
    register,
    setError,
    fetchOrganizations,
    forgotPassword,
    logout,
    resetPassword,
    verify,
    sendVerificationCode,
    getPreSignedLink,
    uploadFile,
};

export default AC;
