import * as authActionsConstants from '../../constants/actions/auth.es6';
import * as authService from '../../services/auth.es6';

import Notification from '../../components/Notification/Notification.jsx';

export function updateUserDetails(data) {
    return dispatch => {
        dispatch({type: authActionsConstants.UPDATE_USER_DETAILS});
        authService.updateUserDetails(data)
            .then((response) => {
                dispatch({type: authActionsConstants.UPDATE_USER_DETAILS, payload: response.data});
                Notification.success('Data successfully updated!');
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.UPDATE_USER_DETAILS, payload: response.data});
                Notification.error(response.response.data);
            });
    };
}