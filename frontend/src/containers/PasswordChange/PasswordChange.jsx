import React from 'react';
import {connect} from 'react-redux';

import * as actions from './actions.es6';

import './PasswordChange.scss';

//components
import PasswordChangeForm from './components/PasswordChangeForm/PasswordChangeForm.jsx';

class PasswordChange extends React.Component {
    render() {
        const { onSubmit } = this.props;
        return (
            <div className="settings container">
                <PasswordChangeForm onSubmit={onSubmit} />
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {};
};


const mapDispatchToProps = dispatch => {
    return {
        onSubmit: formData => {
            dispatch(actions.passwordChange(formData));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
