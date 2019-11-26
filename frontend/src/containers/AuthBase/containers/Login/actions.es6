import * as authActionsConstants from '../../../../constants/actions/auth.es6';
import baseService from '../../../../services/baseService.es6';
import * as authService from '../../../../services/auth.es6';
import urls from '../../../../urls.es6';
import browserHistory from '../../../../history.es6';
import Notification from '../../../../components/Notification/Notification.jsx';

export function login(loginData) {
    return (dispatch) => {
        dispatch({type: authActionsConstants.LOGIN});
        authService.login(loginData)
            .then((response) => {
                dispatch({type: authActionsConstants.LOGIN_SUCCESS, payload: response.data});
                baseService.addAuthToken(response.data.token);
                browserHistory.push(urls.narrations);
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.LOGIN_ERROR, payload: response.response.data});
                Notification.error(response.response.data);
            });
    };
}
