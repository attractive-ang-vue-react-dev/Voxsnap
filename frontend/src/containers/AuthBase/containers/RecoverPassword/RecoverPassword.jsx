import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { recoverPassword } from './actions.es6';

import './RecoverPassword.scss';
import urls from '../../../../urls.es6';

//components

class RecoverPassword extends React.Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <form className="password-setup" onSubmit={handleSubmit}>
                <h1>Recover Password</h1>
                <div className="input-container">
                    <label>EMAIL</label>
                    <Field component="input" type="email" name="email" className="input" />
                </div>
                <button type="submit" className="btn btn-pink big">RECOVER</button>
                <div className="urls-container">
                    <Link to={urls.login}>Go back</Link>
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
            dispatch(recoverPassword(data));
        }
    };
};

RecoverPassword = reduxForm({
    form: 'recoverPasswordForm'
})(RecoverPassword);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecoverPassword);