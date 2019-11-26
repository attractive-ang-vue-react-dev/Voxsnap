import * as authActionsConstants from './constants/actions/auth.es6';
import * as authService from './services/auth.es6';


export function getUserDetails() {
    return dispatch => {
        dispatch({type: authActionsConstants.GET_USER_DETAILS});
        authService.getUserDetails()
            .then((response) => {
                dispatch({type: authActionsConstants.GET_USER_DETAILS_SUCCESS, payload: response.data});
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.GET_USER_DETAILS_ERROR, payload: response.data});
            });
    };
}