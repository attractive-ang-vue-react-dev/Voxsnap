import * as authActionsConstants from '../../constants/actions/auth.es6';
import * as authService from '../../services/auth.es6';
import * as notificationsService from '../../services/notificationsService.es6';
import * as notificationsActionsConstants from '../../constants/actions/notifications.es6';
import browserHistory from '../../history.es6';
import urls from '../../urls.es6';
import baseService from '../../services/baseService.es6';

export function getCurrentUser() {
    return dispatch => {
        authService.getUserData()
            .then((response) => {
                dispatch({type: authActionsConstants.GET_CURRENT_USER_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.GET_CURRENT_USER_ERROR, payload: response.data});
            });
    };
}

export function logout() {
    return (dispatch) => {
        dispatch({type: authActionsConstants.LOGOUT});
        authService.logout()
            .then(() => {
                dispatch({type: authActionsConstants.LOGOUT_SUCCESS});
                baseService.removeAuthToken();
                browserHistory.push(urls.home);
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.LOGOUT_ERROR, payload: response.response.data});
            });
    };
}

export function unreadNotificationsCount() {
    return dispatch => {
        notificationsService.getUnreadNotificationsCount()
            .then((response) => {
                dispatch({type: notificationsActionsConstants.GET_NOTIFICATIONS_COUNT_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: notificationsActionsConstants.GET_NOTIFICATIONS_COUNT_ERROR, payload: response.data});
            });
    };
}