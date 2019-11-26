import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import './AuthBase.scss';
import urls from '../../urls.es6';

//components
import Login from './containers/Login/Login.jsx';
import RecoverPassword from './containers/RecoverPassword/RecoverPassword.jsx';

class AuthBase extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="auth-base">
                    <Switch>
                        <Redirect from={urls.auth} exact to={urls.login} />
                        <Route path={urls.login} exact component={Login}/>
                        <Route path={urls.recoverPassword} exact component={RecoverPassword}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default AuthBase;