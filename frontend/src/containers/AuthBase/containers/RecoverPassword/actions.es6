import * as authService from '../../../../services/auth.es6';
import * as authActionsConstants from '../../../../constants/actions/auth.es6';
import browserHistory from '../../../../history.es6';
import urls from '../../../../urls.es6';

import Notification from '../../../../components/Notification/Notification.jsx';

export function recoverPassword(data) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.PASSWORD_RESET});
        authService.passwordReset(data)
            .then((response) => {
                dispatch({type: authActionsConstants.PASSWORD_RESET_SUCCESS, payload: response.data});
                Notification.success(response.data.detail);
                browserHistory.push(urls.home);
                // window.location = urls.home;
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.PASSWORD_RESET_ERROR, payload: response.response.data});
                Notification.error(response.response.data);
            });
    };
}
