import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AC from '../redux/actions/actionCreater';

import constants from './constants';
import Header from './Header';
import Loader from './loader';

import VCERNAlert from './elements/VCERNAlert';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import Verify from '../pages/Verify';
import Terms from '../pages/Terms';
import PaymentAgreements from '../pages/PaymentAgreements';
import ResetPassword from '../pages/ResetPassword';

import UserRegister from '../pages/user/Register';
import UserDashboard from '../pages/user/Dashboard';
import UserMessages from '../pages/user/Messages';

import OrganizationRegister from '../pages/organization/Register';
import OrganizationDashboard from '../pages/organization/Dashboard';
import OrganizationMessages from '../pages/organization/Messages';
import OrganizationTickets from '../pages/organization/Tickets';

import VCERNDashboard from '../pages/vcern/Dashboard';
import Messages from '../pages/Messages';
import Tickets from '../pages/Tickets';

function Routes({ loading, type, error, token, setError, currentUser }) {
    const commonRoutes = [
        { path: '/', component: Landing },
        { path: '/login', component: Login },
        { path: '/vcern-admin/login', component: Login },
        { path: '/terms-and-conditions', component: Terms },
        { path: '/payment-agreements', component: PaymentAgreements },
        { path: '/forgot-password', component: ForgotPassword },
        { path: `/reset/${type}/:id/:token`, component: ResetPassword },
    ];

    const memberRoutes = [
        { path: '/dashboard', component: UserDashboard },
        { path: '/messages', component: Messages },
    ];

    const organizationRoutes = [
        { path: '/dashboard', component: OrganizationDashboard },
        { path: '/messages', component: Messages },
        { path: '/tickets', component: Tickets },
    ];

    const vcernRoutes = [
        { path: '/dashboard', component: VCERNDashboard },
        { path: '/messages', component: Messages },
        { path: '/tickets', component: Tickets },
    ];

    const RedirectToDashboard = ({ path, component }) => {
        if (!token) {
            return <Route exact path={path} component={component} />;
        } else {
            return <Redirect to="/dashboard" />;
        }
    };

    return (
        <>
            {loading && <Loader />}
            {error && <VCERNAlert message={error} onClose={() => setError(null)} />}
            <Router>
                <Switch>
                    {commonRoutes.map((el, idx) => (
                        <RedirectToDashboard exact key={idx} path={el.path} component={el.component} />
                    ))}
                    <Route exact path="/verify" component={Verify} />

                    {/* users routes */}
                    {type === constants.USER_TYPE_MEMBER && (
                        <>
                            {!token && <Route exact path="/register" component={UserRegister} />}
                            {token && (
                                <Header>
                                    {memberRoutes.map((el, idx) => (
                                        <Route exact key={idx} path={el.path} component={el.component} />
                                    ))}
                                </Header>
                            )}
                        </>
                    )}

                    {/* organizations routes */}
                    {type === constants.USER_TYPE_ORG && (
                        <>
                            {!token && <Route exact path="/register" component={OrganizationRegister} />}
                            {token && (
                                <Header>
                                    {organizationRoutes.map((el, idx) => (
                                        <Route exact key={idx} path={el.path} component={el.component} />
                                    ))}
                                </Header>
                            )}
                        </>
                    )}

                    {/* VCERN Admin routes */}
                    {type === constants.USER_TYPE_VCERN && token && (
                        <Header>
                            {vcernRoutes.map((el, idx) => (
                                <Route exact key={idx} path={el.path} component={el.component} />
                            ))}
                        </Header>
                    )}
                </Switch>
            </Router>
        </>
    );
}

export default connect(state => state, { setError: AC.setError })(Routes);
