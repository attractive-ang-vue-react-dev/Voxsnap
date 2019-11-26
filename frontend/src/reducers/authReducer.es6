import * as authActionsConstants from '../constants/actions/auth.es6';

const initialState = {
    currentUser: null,
    userDetails: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authActionsConstants.LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.user
            };
        case authActionsConstants.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            };
        case authActionsConstants.LOGOUT_SUCCESS:
        case authActionsConstants.GET_CURRENT_USER_ERROR:
            return {
                ...state,
                currentUser: null
            };
        case authActionsConstants.GET_USER_DETAILS:
            return {
                ...state,
                userDetails: null
            };
        case authActionsConstants.GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetails: action.payload
            };
        case authActionsConstants.GET_USER_DETAILS_ERROR:
            return {
                ...state,
                userDetails: null
            };
        default:
            return state;
    }
};

export default authReducer;
