import axios from 'axios';
const api = axios.create({ baseURL: process.env.REACT_APP_BASEAPI });

const login = async ({ email, password }, type, onError) => {
    try {
        const response = await api.post(`/${type === 'organization' ? 'organization-admin' : type}/login`, {
            email,
            password,
            // email: 'lupinokhan@gmail.com',
            // email: 'organ_admin@gmail.com',
            // email: 'vcern@gmail.com',
            // password: '123123',
        });
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const userRegister = async (data, onError) => {
    try {
        const {
            first_name,
            last_name,
            phone,
            email,
            password,
            dob,
            gender,
            street_address,
            apt,
            city,
            state,
            zip_code,
            organization,
            b_first_name,
            b_last_name,
            b_phone,
            b_email,
            b_dob,
            b_relation,
            b_street_address,
            b_apt,
            b_city,
            b_state,
            b_zip_code,
            payment_method,
        } = data;
        const response = await api.post('/member/', {
            first_name,
            last_name,
            gender,
            email,
            dob: new Date(dob),
            phone,
            password,
            organization: organization._id,
            address: { street_address, apt, city, state, zip_code },
            beneficiary: {
                first_name: b_first_name,
                last_name: b_last_name,
                phone: b_phone,
                email: b_email,
                dob: new Date(b_dob),
                relationship: b_relation,
                address: { street_address: b_street_address, apt: b_apt, city: b_city, state: b_state, zip_code: b_zip_code },
            },
            payment_method,
            // first_name: 'Member',
            // last_name: 'Name',
            // gender: 'male',
            // email: 'member@gmail.com',
            // dob: 'Mon May 10 2021 20:15:21 GMT+0500 (Pakistan Standard Time)',
            // phone: '+44',
            // password: '123123',
            // organization: '60994cc34f58640552afae6b',
            // address: {
            //     street_address: '123 Street',
            //     apt: 'House 123',
            //     city: 'Some City',
            //     state: 'Alabama',
            //     zip_code: '45000',
            // },
            // beneficiary: {
            //     first_name: 'Son',
            //     last_name: 'Guy',
            //     email: 'son@gmail.com',
            //     phone: '+1111111111',
            //     dob: 'Mon May 10 2021 20:15:21 GMT+0500 (Pakistan Standard Time)',
            //     relationship: 'son',
            //     address: {
            //         street_address: '123 Street',
            //         apt: 'House 123',
            //         city: 'Some City',
            //         state: 'Alabama',
            //         zip_code: '45000',
            //     },
            // },
        });
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const organizationRegister = async (data, onError) => {
    try {
        const {
            first_name,
            last_name,
            a_phone,
            email,
            password,
            name,
            phone,
            street_address,
            apt,
            city,
            state,
            zip_code,
            p1_first_name,
            p1_last_name,
            p1_phone,
            p1_email,
            p2_first_name,
            p2_last_name,
            p2_phone,
            p2_email,
            payment_method,
        } = data;
        const response = await api.post('/organization/', {
            name,
            phone,
            address: { street_address: street_address, apt: apt, city: city, state: state, zip_code: zip_code },
            contact_first: { first_name: p1_first_name, last_name: p1_last_name, email: p1_email, phone: p1_phone },
            contact_second: { first_name: p2_first_name, last_name: p2_last_name, email: p2_email, phone: p2_phone },
            admin: { first_name, last_name, phone: a_phone, email, password },
            payment_method,
            // name: 'OrganIzation',
            // phone: '+1111111111',
            // address: { street_address: '123 Street', apt: 'House 123', city: 'Some City', state: 'Alabama', zip_code: '45000' },
            // contact_first: { first_name: 'first', last_name: 'Guy', email: 'first_guy@gmail.com', phone: '+1111111111' },
            // contact_second: { first_name: 'second', last_name: 'Guy', email: 'second_guy@gmail.com', phone: '+1111111111' },
            // admin: { first_name: 'first', last_name: 'Guy', email: 'organ_admin@gmail.com', username: 'organ_admin', password: '123123', phone: '+1111111111' },
        });
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const fetchOrganizations = async onError => {
    try {
        const response = await api.get('/organization/all');
        return response?.data?.organizations;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const forgotPassword = async (email, type, onError) => {
    try {
        const response = await api.post(`/${type === 'organization' ? 'organization-admin' : type}/forgotPassword`, {
            email,
        });
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const resetPassword = async ({ token, password, id }, type, onError) => {
    try {
        const response = await api.patch(`/${type === 'organization' ? 'organization-admin' : type}/resetPassword/${id}`, {
            password,
            token,
        });
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const verify = async ({ code, token }, type, onError) => {
    try {
        const response = await api.post(
            `/${type}/verify`,
            {
                code,
            },
            {
                headers: {
                    'auth-token': token,
                },
            },
        );
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const sendVerificationCode = async (token, type, onError) => {
    try {
        const response = await api.post(
            `/${type}/sendVerificationCode/email`,
            {},
            {
                headers: {
                    'auth-token': token,
                },
            },
        );
        return response?.data;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const getPreSignedLink = async ({ name, type }, onError) => {
    try {
        const response = await api.post(`/files/`, { name, type });
        return response?.data?.url;
    } catch (error) {
        onError(error?.response.data);
        return false;
    }
};

const uploadFile = async ({ url, file, type }, onError) => {
    return new Promise(async (res, rej) => {
        try {
            const response = await axios({
                method: 'PUT',
                data: await file.arrayBuffer(),
                url,
                headers: {
                    'Content-Type': type,
                },
            });
            if (response.status === 200) return res(true);
            throw new Error();
        } catch (error) {
            return rej(error);
        }
    });
};

const API = {
    login,
    userRegister,
    organizationRegister,
    fetchOrganizations,
    forgotPassword,
    resetPassword,
    verify,
    sendVerificationCode,
    getPreSignedLink,
    uploadFile,
};

export default API;
