import { reset } from 'redux-form';

import * as authActionsConstants from '../../constants/actions/auth.es6';
import * as authService from '../../services/auth.es6';

import Notification from '../../components/Notification/Notification.jsx';

export function passwordChange(data) {
    return dispatch => {
        dispatch({type: authActionsConstants.PASSWORD_CHANGE});
        authService.passwordChange(data)
            .then((response) => {
                dispatch({type: authActionsConstants.PASSWORD_CHANGE_SUCCESS, payload: response.data});
                dispatch(reset('passwordChangeForm'));
                Notification.success('Password changed successfully!');
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.PASSWORD_CHANGE_ERROR, payload: response.data});
                Notification.error(response.response.data);
            });
    };
}