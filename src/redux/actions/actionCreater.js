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
        dispatch(setLoading(false));
    };
};

const uploadFile = (data, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.uploadFile(data, error => dispatch(setError(error)));
        result && callback();
        dispatch(setLoading(false));
    };
};

const requestNewPool = (data, token, callback) => {
    return async dispatch => {
        const result = await API.requestNewPool(data, token, error => dispatch(setError(error)));
        result && callback();
        dispatch(setLoading(false));
    };
};

const setSelectedPool = payload => ({ type: constants.SET_SELECTED_POOL, payload });

const fetchNewPoolRequests = (token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchNewPoolRequests(token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const respondToNewPoolRequest = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.respondToNewPoolRequest(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const fetchPools = (data, type, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchPools(data, type, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const triggerNotification = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.triggerNotification(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const triggerEvent = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.triggerEvent(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const fetchInvitations = (token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchInvitations(token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const joinPool = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.joinPool(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const addBlog = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.addBlog(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const fetchBlogs = (token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchBlogs(token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const toggleOrganizationsAvailability = (id, token, organizations, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.toggleOrganizationsAvailability(id, token, error => dispatch(setError(error)));

        if (result) {
            callback(result);
            dispatch({ type: constants.SET_ORGANIZATIONS, payload: [...organizations.filter(el => el._id !== result._id), result] });
        }
        dispatch(setLoading(false));
    };
};

const fetchAdmins = (token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchAdmins(token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const addVcernAdmin = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.addVcernAdmin(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const toggleVcernAdminRole = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.toggleVcernAdminRole(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const toggleVcernAdminAvailability = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.toggleVcernAdminAvailability(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const customizeOrganization = (data, id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.customizeOrganization(data, id, token, error => dispatch(setError(error)));
        console.log(result);
        if (result) {
            callback(result);
            dispatch({ type: constants.LOGIN, payload: { organization: result } });
        }
        dispatch(setLoading(false));
    };
};

const fetchMembersNotInPool = (id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchMembersNotInPool(id, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const fetchOrganizationAdmins = (id, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchOrganizationAdmins(id, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const fetchPoolMembers = (id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchPoolMembers(id, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const inviteToJoin = (data, type, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.inviteToJoin(data, type, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const makeMemberAdmin = (id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.makeMemberAdmin(id, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const inviteToJoinPool = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.inviteToJoinPool(data, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const removeOrganizationAdmin = (id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.removeOrganizationAdmin(id, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const removeMemberFromPool = (id, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.removeMemberFromPool(id, token, error => dispatch(setError(error)));
        result && callback(result);
        dispatch(setLoading(false));
    };
};

const updateMember = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.updateMember(data, token, error => dispatch(setError(error)));
        if (result) {
            callback(result);
            dispatch({ type: constants.LOGIN, payload: { user: result } });
        }
        dispatch(setLoading(false));
    };
};

const updateBeneficiary = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.updateBeneficiary(data, token, error => dispatch(setError(error)));
        if (result) {
            callback(result);
            dispatch({ type: constants.LOGIN, payload: { user: result } });
        }
        dispatch(setLoading(false));
    };
};

const fetchDocs = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.fetchDocs(data, token, error => dispatch(setError(error)));
        if (result) callback(result);
        dispatch(setLoading(false));
    };
};

const addDoc = (data, token, callback) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const result = await API.addDoc(data, token, error => dispatch(setError(error)));
        if (result) callback(result);
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
    setSelectedPool,
    requestNewPool,
    fetchNewPoolRequests,
    respondToNewPoolRequest,
    fetchPools,
    triggerNotification,
    triggerEvent,
    fetchInvitations,
    joinPool,
    addBlog,
    fetchBlogs,
    toggleOrganizationsAvailability,
    fetchAdmins,
    addVcernAdmin,
    toggleVcernAdminRole,
    toggleVcernAdminAvailability,
    customizeOrganization,
    fetchMembersNotInPool,
    fetchOrganizationAdmins,
    fetchPoolMembers,
    inviteToJoin,
    makeMemberAdmin,
    inviteToJoinPool,
    removeOrganizationAdmin,
    removeMemberFromPool,
    updateMember,
    updateBeneficiary,
    fetchDocs,
    addDoc,
};

export default AC;
