import constants from '../../common/constants';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    type: 'USER',
    token: null,
    organizations: [],
    currentOrganization: {},
    userSubscriptionPrice: 19.99,
    organizationSubscriptionPrice: 399,
    selectedPool: {},
    currentPageTitle: 'Dashboard',
};

const Reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.LOGIN:
            return {
                ...state,
                currentUser: payload?.user || state.currentUser,
                token: payload?.token ?? state.token,
                currentOrganization: payload.organization || null,
                loading: false,
                error: null,
            };
        case constants.SET_ORGANIZATIONS:
            return { ...state, organizations: payload, loading: false, error: null };
        case constants.SET_CURRENT_ORGANIZATION:
            return { ...state, currentOrganization: payload, loading: false, error: null };
        case constants.SET_CURRENT_PAGE_TITLE:
            return { ...state, currentPageTitle: payload, loading: false, error: null };
        case constants.SET_USER_TYPE:
            return { ...state, type: payload, loading: false, error: null };
        case constants.SET_SELECTED_POOL:
            return { ...state, selectedPool: payload, loading: false, error: null };
        case constants.SET_ERROR:
            return { ...state, loading: false, error: payload?.message || payload };
        case constants.SET_LOADING:
            return { ...state, loading: payload };
        default:
            return state;
    }
};

export default Reducer;
