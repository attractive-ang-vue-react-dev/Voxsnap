import React from 'react';
import { reduxForm, Field } from 'redux-form';

import './PasswordChangeForm.scss';


class PasswordChangeForm extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="password-change-form" onSubmit={handleSubmit}>
                <div className="section">
                    <div className="title">
                        <h3>Password Change</h3>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>New password</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <Field
                                    name="new_password1"
                                    component="input"
                                    type="password"
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Repeat new password</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <Field
                                    name="new_password2"
                                    component="input"
                                    type="password"
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-button-container">
                    <button className="btn btn-pink big">
                        Save
                    </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'passwordChangeForm'
})(PasswordChangeForm);