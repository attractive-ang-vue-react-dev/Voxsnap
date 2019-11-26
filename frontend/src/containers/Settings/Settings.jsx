import React from 'react';
import {connect} from 'react-redux';

import * as globalActions from '../../globalActions.es6';
import * as actions from './actions.es6';

import './Settings.scss';

//components
import SettingsForm from './components/SettingsForm/SettingsForm.jsx';

class Settings extends React.Component {
    componentDidMount() {
        this.props.getUserDetails();
    }
    render() {
        const { userDetails, onSubmit } = this.props;
        return (
            <div className="settings container">
                {userDetails &&
                <SettingsForm
                    initialValues={{
                        'first_name': userDetails.first_name,
                        'email': userDetails.email,
                        'customer': userDetails.customer
                    }}
                    onSubmit={onSubmit}
                />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userDetails: state.authReducer.userDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: () => {
            dispatch(globalActions.getUserDetails());
        },
        onSubmit: formData => {
            dispatch(actions.updateUserDetails(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
