import axios from "axios";
import constants from "./constants";
const api = axios.create({ baseURL: process.env.REACT_APP_BASEAPI });

const login = async ({ email, password }, type, onError) => {
  try {
    const response = await api.post(
      `/${type === "organization" ? "organization-admin" : type}/login`,
      { email, password }
    );
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
    const response = await api.post("/member/", {
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
        address: {
          street_address: b_street_address,
          apt: b_apt,
          city: b_city,
          state: b_state,
          zip_code: b_zip_code,
        },
      },
      payment_method,
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
    const response = await api.post("/organization/", {
      name,
      phone,
      address: {
        street_address: street_address,
        apt: apt,
        city: city,
        state: state,
        zip_code: zip_code,
      },
      contact_first: {
        first_name: p1_first_name,
        last_name: p1_last_name,
        email: p1_email,
        phone: p1_phone,
      },
      contact_second: {
        first_name: p2_first_name,
        last_name: p2_last_name,
        email: p2_email,
        phone: p2_phone,
      },
      admin: { first_name, last_name, phone: a_phone, email, password },
      payment_method,
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchOrganizations = async (onError) => {
  try {
    const response = await api.get("/organization/all");
    return response?.data?.organizations;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const forgotPassword = async (email, type, onError) => {
  try {
    const response = await api.post(
      `/${
        type === "organization" ? "organization-admin" : type
      }/forgotPassword`,
      {
        email,
      }
    );
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const resetPassword = async ({ token, password, id }, type, onError) => {
  try {
    const response = await api.patch(
      `/${
        type === "organization" ? "organization-admin" : type
      }/resetPassword/${id}`,
      {
        password,
        token,
      }
    );
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
          "auth-token": token,
        },
      }
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
          "auth-token": token,
        },
      }
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
        method: "PUT",
        data: await file.arrayBuffer(),
        url,
        headers: {
          "Content-Type": type,
        },
      });
      if (response.status === 200) return res(true);
      throw new Error();
    } catch (error) {
      return rej(error);
    }
  });
};

const requestNewPool = async (data, token, onError) => {
  try {
    const { end_date, start_date } = data;
    await api.post(
      `/pool/request`,
      {
        ...data,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
      },
      {
        headers: { "auth-token": token },
      }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchNewPoolRequests = async (token, onError) => {
  try {
    const response = await api.get("/pool/getAllPoolRequests", {
      headers: {
        "auth-token": token,
      },
    });
    return response?.data?.requests;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const respondToNewPoolRequest = async (data, token, onError) => {
  try {
    await api.post(
      `/pool/respond`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPools = async (data, type, token, onError) => {
  try {
    const response = await api.get(
      `pool/${
        type === constants.USER_TYPE_MEMBER
          ? "getPoolsByMember"
          : "getPoolsByOrganization"
      }/${type === constants.USER_TYPE_MEMBER ? data._id : data.organization}`,
      {
        headers: { "auth-token": token },
      }
    );
    return response?.data?.pools;
  } catch (error) {
    onError(error?.response?.data);
    return false;
  }
};

const triggerNotification = async (data, token, onError) => {
  try {
    await api.post(
      `/notification/announcement`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const triggerEvent = async (data, token, onError) => {
  try {
    await api.post(
      `/pool/createEvent`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchInvitations = async (token, onError) => {
  try {
    const response = await api.get(`/pool/getInvitations`, {
      headers: { "auth-token": token },
    });
    return response?.data?.invitations;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const joinPool = async (id, token, onError) => {
  try {
    await api.post(
      `/pool/joinPool/${id}`,
      { status: "ACCEPTED" },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const addBlog = async (data, token, onError) => {
  try {
    await api.post(`/blog/`, { ...data }, { headers: { "auth-token": token } });
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchBlogs = async (token, onError) => {
  try {
    const response = await api.get(`/blog/`, {
      headers: { "auth-token": token },
    });
    return response?.data?.blogs;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const toggleOrganizationsAvailability = async (id, token, onError) => {
  try {
    const response = await api.post(
      `/organization/toggleDisabillity/${id}`,
      {},
      { headers: { "auth-token": token } }
    );
    return response?.data?.organization;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchAdmins = async (token, onError) => {
  try {
    const response = await api.get(`/admin/`, {
      headers: { "auth-token": token },
    });
    return response?.data?.admins;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const addVcernAdmin = async (data, token, onError) => {
  try {
    const response = await api.post(
      `/admin/`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return response?.data?.admin;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const toggleVcernAdminRole = async (id, token, onError) => {
  try {
    const response = await api.post(
      `/admin/togglePermissions/${id}`,
      {},
      { headers: { "auth-token": token } }
    );
    return response?.data?.admin;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const toggleVcernAdminAvailability = async (id, token, onError) => {
  try {
    const response = await api.post(
      `/admin/toggleDisabillity/${id}`,
      {},
      { headers: { "auth-token": token } }
    );
    return response?.data?.admin;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const customizeOrganization = async (data, id, token, onError) => {
  try {
    const response = await api.patch(
      `/organization/customize/${id}`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return response?.data?.organization;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchMembersNotInPool = async (id, token, onError) => {
  try {
    const response = await api.get(`/pool/getMembersNotInPool/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.members;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchOrganizationAdmins = async (id, onError) => {
  try {
    const response = await api.get(`/organization/getAllAdmins/${id}`);
    return response?.data?.admins;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPoolMembers = async (id, token, onError) => {
  try {
    const response = await api.get(`/pool/getMembersByPool/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.members;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const inviteToJoin = async (data, type, token, onError) => {
  try {
    await api.post(
      `/organization/invite/${type}/`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const makeMemberAdmin = async (id, token, onError) => {
  try {
    const response = await api.post(
      `/organization/makeAdmin/${id}/`,
      {},
      { headers: { "auth-token": token } }
    );
    return response?.data?.admin;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const inviteToJoinPool = async (data, token, onError) => {
  try {
    const response = await api.post(
      `/pool/invite/`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return response?.data?.message;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const removeOrganizationAdmin = async (id, token, onError) => {
  try {
    const response = await api.post(
      `/organization-admin/toggleDisabillity/${id}`,
      {},
      { headers: { "auth-token": token } }
    );
    return response?.data?.message;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const removeMemberFromPool = async (id, token, onError) => {
  try {
    const response = await api.delete(`/pool/removeMember/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.message;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const updateMember = async (data, token, onError) => {
  const {
    newPhone,
    newEmail,
    newState,
    newCity,
    newPassword,
    newApt,
    newStreet,
    image,
  } = data;
  try {
    const response = await api.patch(
      `/member`,
      {
        phone: newPhone,
        email: newEmail,
        password: newPassword,
        state: newState,
        city: newCity,
        apt: newApt,
        street_address: newStreet,
        image,
      },
      { headers: { "auth-token": token } }
    );
    return response?.data?.memberToUpdate;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const updateBeneficiary = async (data, token, onError) => {
  const {
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
  try {
    const response = await api.patch(
      `/member/beneficiary`,
      {
        dob: b_dob,
        email: b_email,
        first_name: b_first_name,
        last_name: b_last_name,
        phone: b_phone,
        relationship: b_relation,
        state: b_state,
        city: b_city,
        apt: b_apt,
        street_address: b_street_address,
        zip_code: b_zip_code,
      },
      { headers: { "auth-token": token } }
    );
    return response?.data?.memberToUpdate;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchDocs = async (id, token, onError) => {
  try {
    const response = await api.get(`/member/documents/get/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.docs;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const addDoc = async (data, token, onError) => {
  try {
    const response = await api.post(
      `/member/documents/add`,
      { ...data },
      { headers: { "auth-token": token } }
    );
    return response?.data?.doc;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPaymentMethods = async (token, onError) => {
  try {
    const response = await api.get(`/member/paymentMethods/`, {
      headers: { "auth-token": token },
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const setDefaultCard = async (idx, token, onError) => {
  try {
    const response = await api.patch(
      `/member/paymentMethods/updateDefault`,
      { payment_method: idx },
      { headers: { "auth-token": token } }
    );
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const addNewPaymentMethod = async (idx, token, onError) => {
  try {
    await api.post(
      `/member/paymentMethods/add`,
      { payment_method: idx },
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const removePaymentMethod = async (idx, token, onError) => {
  try {
    await api.delete(`/member/paymentMethods/delete/${idx}`, {
      headers: { "auth-token": token },
    });
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchMembersPayments = async (month, year, token, onError) => {
  try {
    const response = await api.get(`/member/payments/${month}/${year}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.charges;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchStats = async (id, type, token, onError) => {
  try {
    const response = await api.get(`/${type}/stats/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const payEvent = async (id, token, onError) => {
  try {
    await api.post(
      `/pool/payForEvent/${id}`,
      {},
      { headers: { "auth-token": token } }
    );
    return true;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPoolEvents = async (id, token, onError) => {
  try {
    const response = await api.get(`/pool/getEvents/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.events;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPendingMembers = async (id, token, onError) => {
  try {
    const response = await api.get(`/organization/pending/${id}`, {
      headers: { "auth-token": token },
    });
    return response?.data?.result;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchOrganizationsPayments = async (id, month, year, token, onError) => {
  try {
    const response = await api.get(
      `/organization/payments/${id}/${month}/${year}`,
      { headers: { "auth-token": token } }
    );
    return response?.data?.result;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchAllStats = async (token, onError) => {
  try {
    const response = await api.get(`/admin/stats/`, {
      headers: { "auth-token": token },
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchAllPendingMembers = async (token, onError) => {
  try {
    const response = await api.get(`/admin/pending/`, {
      headers: { "auth-token": token },
    });
    return response?.data?.result;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchPoolStats = async (token, onError) => {
  try {
    const response = await api.get(`/organization/getPoolsStats/`, {
      headers: { "auth-token": token },
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchOrganizationStats = async (token, onError) => {
  try {
    const response = await api.get(`/organization/getOrganizationsStats/`, {
      headers: { "auth-token": token },
    });
    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
};

const fetchMembersDataByPool = async (id, token, onError) => {
  try {
    console.log({ id });
    const response = await api.get(`/pool/getMembersByPool/${id}?limit=4`, {
      headers: { "auth-token": token },
    });

    return response?.data;
  } catch (error) {
    onError(error?.response.data);
    return false;
  }
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
  fetchPaymentMethods,
  setDefaultCard,
  addNewPaymentMethod,
  removePaymentMethod,
  fetchMembersPayments,
  fetchStats,
  payEvent,
  fetchPoolEvents,
  fetchPendingMembers,
  fetchOrganizationsPayments,
  fetchAllStats,
  fetchAllPendingMembers,
  fetchPoolStats,
  fetchOrganizationStats,
  fetchMembersDataByPool,
};

export default API;
