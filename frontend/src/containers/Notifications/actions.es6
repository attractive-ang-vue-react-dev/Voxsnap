import * as notificationsService from '../../services/notificationsService.es6';
import * as notificationsActionsConstants from '../../constants/actions/notifications.es6';

export function getNotifications(pageNumber) {
    return dispatch => {
        dispatch({type: notificationsActionsConstants.GET_NOTIFICATIONS});

        notificationsService.getNotifications(pageNumber).then(response => {
            dispatch({type: notificationsActionsConstants.GET_NOTIFICATIONS_SUCCESS, payload: {
                notificationsList: response.data,
                activePage: pageNumber
            }});
            dispatch(markAllNotificationsRead());
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}

export function markAllNotificationsRead() {
    return dispatch => {
        dispatch({type: notificationsActionsConstants.MARK_ALL_NOTIFICATIONS_READ});
        notificationsService.markAllNotificationsRead()
            .then(() => {
                dispatch({type: notificationsActionsConstants.MARK_ALL_NOTIFICATIONS_READ_SUCCESS});
            })
            .catch(() => {
                dispatch({type: notificationsActionsConstants.MARK_ALL_NOTIFICATIONS_READ_ERROR});
            });
    };
}