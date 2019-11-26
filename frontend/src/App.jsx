import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from './history.es6';

import projectStore from './store.es6';
import urls from './urls.es6';
import baseService from './services/baseService.es6';

import 'sans-serif/css/sans-serif.min.css';
import './style.scss';

//components
import DashboardBase from './components/DashboardBase/DashboardBase.jsx';
import OrderNarrationsPrev from './containers/OrderNarrationsPrev/OrderNarrationsPrev.jsx';
import OrderNarrations from './containers/OrderNarrations/OrderNarrations.jsx';
import OrderComplete from './containers/OrderComplete/OrderComplete.jsx';
import AuthBase from './containers/AuthBase/AuthBase.jsx';
import Narrations from './containers/Narrations/Narrations.jsx';
import Playlists from './containers/Playlists/Playlists.jsx';
import Distribution from './containers/Distribution/Distribution.jsx';
import Settings from './containers/Settings/Settings.jsx';
import Billing from './containers/Billing/Billing.jsx';
import Notifications from './containers/Notifications/Notifications.jsx';
import PasswordChange from './containers/PasswordChange/PasswordChange.jsx';


const DashboardRoutePublic = ({component: Component, ...props}) => {
    return (
        <Route
            {...props}
            render={matchProps => (
                <DashboardBase {...props}>
                    <Component {...matchProps} />
                </DashboardBase>
            )}
        />
    );
};


const DashboardRouteAuthRequired = ({component: Component, ...props}) => {
    return baseService.isUserAuthenticated() ? (
        <DashboardRoutePublic {...props} component={Component} />
    ): (
        <Redirect to={urls.login} />
    );
};


const routes = (
    <div>
        <Router history={history}>
            <Switch>
                <DashboardRoutePublic path={urls.auth} component={AuthBase} hideMenu />
                <DashboardRoutePublic path={urls.orderNarrationsPrev} component={OrderNarrationsPrev} hideMenu />
                <DashboardRoutePublic path={urls.orderNarrations} component={OrderNarrations} hideMenu />
                <DashboardRoutePublic path={urls.orderComplete} component={OrderComplete} hideMenu />
                <DashboardRouteAuthRequired path={urls.narrations} component={Narrations} />
                <DashboardRouteAuthRequired path={urls.playlists} component={Playlists} />
                <DashboardRouteAuthRequired path={urls.distribution} component={Distribution} />
                <Route path="/analytics" component={
                    () => {
                        window.location = '/cratedb';
                        return null;
                    }
                }/>
                <DashboardRouteAuthRequired path={urls.settings} component={Settings} />
                <DashboardRouteAuthRequired path={urls.passwordChange} component={PasswordChange} />
                <DashboardRouteAuthRequired path={urls.billing} component={Billing} />
                <DashboardRouteAuthRequired path={urls.notifications} component={Notifications} />
            </Switch>
        </Router>
        <ToastContainer/>
    </div>
);

ReactDOM.render(
    <Provider store={projectStore}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
