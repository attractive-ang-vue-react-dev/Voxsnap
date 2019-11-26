import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from './actions.es6';

import './Login.scss';

import urls from '../../../../urls.es6';

//components

class Login extends React.Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <form className="login" onSubmit={handleSubmit}>
                <h1>Welcome back!</h1>
                <div className="input-container">
                    <label>EMAIL</label>
                    <Field component="input" type="email" name="email" className="input" />
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <Field component="input" type="password" name="password" className="input" />
                </div>
                <button type="submit" className="btn btn-pink big">SIGN IN</button>
                <div className="urls-container">
                    <Link to={urls.recoverPassword}>Recover Password</Link>
                </div>
            </form>
        );
    }
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: data => {
            dispatch(login(data));
        }
    };
};

Login = reduxForm({
    form: 'loginForm'
})(Login);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);