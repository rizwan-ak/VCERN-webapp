import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import AC from "../redux/actions/actionCreater";

import constants from "./constants";
import Header from "./Header";
import Loader from "./loader";

import VCERNAlert from "./elements/VCERNAlert";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Verify from "../pages/Verify";
import Terms from "../pages/Terms";
import PaymentAgreements from "../pages/PaymentAgreements";
import ResetPassword from "../pages/ResetPassword";
import Messages from "../pages/Messages";
import Tickets from "../pages/Tickets";
import SelectPool from "../pages/SelectPool";
import AllPools from "../pages/AllPools";
import Blogs from "../pages/Blogs";
import SingleBlog from "../pages/SingleBlog";
import Profile from "../pages/Profile";
import Events from "../pages/Events";

import UserRegister from "../pages/user/Register";
import UserDashboard from "../pages/user/Dashboard";
import UserSettings from "../pages/user/Settings";
import UserEditProfile from "../pages/user/EditProfile";
import UserDocuments from "../pages/user/Documents";
import UserPayments from "../pages/user/Payments";

import OrganizationRegister from "../pages/organization/Register";
import OrganizationDashboard from "../pages/organization/Dashboard";
import NewPool from "../pages/organization/NewPool";
import ManageGroups from "../pages/organization/ManageGroups";
import OrganizationSettings from "../pages/organization/Settings";
import OrganizationManageMembers from "../pages/organization/ManageMembers";
import OrganizationPayments from "../pages/organization/Payments";

import VCERNDashboard from "../pages/vcern/Dashboard";
import VCERNManageOrganizations from "../pages/vcern/ManageOrganizations";
import VCERNManageAdmins from "../pages/vcern/ManageAdmins";
import VCERNAddBlog from "../pages/vcern/AddBlog";
import VCERNSingleOrganization from "../pages/vcern/SingleOrganization";
import VCERNPayments from "../pages/vcern/Payments";

function Routes({ loading, type, error, token, setError, currentUser }) {
  const commonRoutes = [
    { path: "/", component: Landing },
    { path: "/login", component: Login },
    { path: "/vcern-admin/login", component: Login },
    { path: "/forgot-password", component: ForgotPassword },
    { path: `/reset/${type}/:id/:token`, component: ResetPassword },
  ];

  const memberRoutes = [
    { path: "/dashboard", component: UserDashboard },
    { path: "/messages", component: Messages },
    { path: "/select-pool", component: SelectPool },
    { path: "/all-pools", component: AllPools },
    { path: "/blogs", component: Blogs },
    { path: "/blog", component: SingleBlog },
    { path: "/settings", component: UserSettings },
    { path: "/edit-profile", component: UserEditProfile },
    { path: "/profile", component: Profile },
    { path: "/documents", component: UserDocuments },
    { path: "/events", component: Events },
    { path: "/payments", component: UserPayments },
  ];

  const organizationRoutes = [
    { path: "/dashboard", component: OrganizationDashboard },
    { path: "/messages", component: Messages },
    { path: "/tickets", component: Tickets },
    { path: "/select-pool", component: SelectPool },
    { path: "/new-pool", component: NewPool },
    { path: "/all-pools", component: AllPools },
    { path: "/manage-groups", component: ManageGroups },
    { path: "/settings", component: OrganizationSettings },
    { path: "/manage-members", component: OrganizationManageMembers },
    { path: "/member/:id", component: Profile },
    { path: "/events", component: Events },
    { path: "/payments", component: OrganizationPayments },
  ];

  const vcernRoutes = [
    { path: "/dashboard", component: VCERNDashboard },
    { path: "/messages", component: Messages },
    { path: "/tickets", component: Tickets },
    { path: "/requests", component: AllPools },
    { path: "/manage-organizations", component: VCERNManageOrganizations },
    { path: "/manage-members", component: VCERNManageAdmins },
    { path: "/add-blog", component: VCERNAddBlog },
    { path: "/blogs", component: Blogs },
    { path: "/blog", component: SingleBlog },
    { path: "/organization", component: VCERNSingleOrganization },
    { path: "/payments", component: VCERNPayments },
    { path: "/events", component: Events },
    { path: "/organizations-history", component: OrganizationPayments },
  ];

  const RedirectToDashboard = ({ path, component }) => {
    if (!token) {
      return <Route exact path={path} component={component} />;
    } else {
      return (
        <Redirect
          to={
            type === constants.USER_TYPE_VCERN ? "/dashboard" : "/select-pool"
          }
        />
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      {error && <VCERNAlert message={error} onClose={() => setError(null)} />}
      <Router>
        <Switch>
          {commonRoutes.map((el, idx) => (
            <RedirectToDashboard
              exact
              key={idx}
              path={el.path}
              component={el.component}
            />
          ))}
          <Route exact path="/verify" component={Verify} />
          <Route
            exact
            path="/terms-and-conditions"
            component={PaymentAgreements}
          />
          <Route exact path="/payment-agreements" component={Terms} />

          {/* users routes */}
          {type === constants.USER_TYPE_MEMBER && (
            <>
              {!token && (
                <Route exact path="/register" component={UserRegister} />
              )}
              {token && (
                <Header>
                  {memberRoutes.map((el, idx) => (
                    <Route
                      exact
                      key={idx}
                      path={el.path}
                      component={el.component}
                    />
                  ))}
                </Header>
              )}
            </>
          )}

          {/* organizations routes */}
          {type === constants.USER_TYPE_ORG && (
            <>
              {!token && (
                <Route
                  exact
                  path="/register"
                  component={OrganizationRegister}
                />
              )}
              {token && (
                <Header>
                  {organizationRoutes.map((el, idx) => (
                    <Route
                      exact
                      key={idx}
                      path={el.path}
                      component={el.component}
                    />
                  ))}
                </Header>
              )}
            </>
          )}

          {/* VCERN Admin routes */}
          {type === constants.USER_TYPE_VCERN && token && (
            <Header>
              {vcernRoutes.map((el, idx) => (
                <Route
                  exact
                  key={idx}
                  path={el.path}
                  component={el.component}
                />
              ))}
            </Header>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default connect((state) => state, { setError: AC.setError })(Routes);
