const constants = {
    LOGIN: 'LOGIN',
    SET_ORGANIZATIONS: 'SET_ORGANIZATIONS',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    SET_USER_TYPE: 'SET_USER_TYPE',
    SET_SELECTED_POOL: 'SET_SELECTED_POOL',
    USER_TYPE_ORG: 'organization',
    USER_TYPE_MEMBER: 'member',
    USER_TYPE_VCERN: 'admin',
    EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    SPECIAL_CHARACTER_REGEX: /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~,0-9]/,
    UPPERCASE_REGEX: /[A-Z]/,
    LOWERCASE_REGEX: /[a-z]/,
};

export default constants;
