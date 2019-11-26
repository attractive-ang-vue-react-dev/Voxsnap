import React from 'react';
import { reduxForm, Field } from 'redux-form';

import './SettingsForm.scss';

import FormColorPicker from '../../../../components/FormColorPicker/FormColorPicker.jsx';


class SettingsForm extends React.Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form className="settings-form" onSubmit={handleSubmit}>
                <div className="section">
                    <div className="title">
                        <h3>Settings</h3>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Company</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Name</label>
                                <Field
                                    name="customer.company_name"
                                    component="input"
                                    type="text"
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Phone number</label>
                                <Field
                                    name="customer.phone_number"
                                    component="input"
                                    type="text"
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Account owner</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Name</label>
                                <Field
                                    name="first_name"
                                    component="input"
                                    type="text"
                                    className="input"
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Twitter</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Handle</label>
                                <Field
                                    name="customer.twitter"
                                    component="input"
                                    type="text"
                                    className="input"

                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Branding</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>Color</label>
                                <Field
                                    name="customer.brand_color"
                                    component={FormColorPicker}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="columns form-row">
                        <div className="col-3">
                            <h3>Website</h3>
                        </div>
                        <div className="col-3">
                            <div className="input-container">
                                <label>URL</label>
                                <Field
                                    name="customer.website"
                                    component="input"
                                    type="text"
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
    form: 'settingsForm'
})(SettingsForm);