import * as notificationsActionsConstants from '../constants/actions/notifications.es6';

const initialState = {
    notificationsList: [],
    notificationsLoading: true,
    activePage: 1,
    unreadNotificationsCount: ''
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationsActionsConstants.GET_NOTIFICATIONS:
            return {
                ...state,
                notificationsLoading: true
            };
        case notificationsActionsConstants.GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notificationsLoading: false,
                notificationsList: action.payload.notificationsList,
                activePage: action.payload.activePage
            };
        case notificationsActionsConstants.GET_NOTIFICATIONS_COUNT_SUCCESS:
            return {
                ...state,
                unreadNotificationsCount: action.payload.unread_count
            };
        case notificationsActionsConstants.MARK_ALL_NOTIFICATIONS_READ_SUCCESS:
            return {
                ...state,
                unreadNotificationsCount: 0
            };
        default:
            return state;
    }
};

export default notificationsReducer;
