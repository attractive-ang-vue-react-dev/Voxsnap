import * as authActionsConstants from '../../../../constants/actions/narrations.es6';
import * as narrationsService from '../../../../services/narrationsService.es6';
import Notification from '../../../../components/Notification/Notification.jsx';

export function getNarrationDetails(narrationId) {
    return dispatch => {
        dispatch({type: authActionsConstants.GET_NARRATION_DETAILS});

        narrationsService.getNarrationDetails(narrationId).then(response => {
            dispatch({type: authActionsConstants.GET_NARRATION_DETAILS_SUCCESS, payload: response.data});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}

export function updateNarrationDetails(formData) {
    return dispatch => {
        dispatch({type: authActionsConstants.UPDATE_NARRATION_DETAILS});
        narrationsService.updateNarrationDetails(formData)
            .then((response) => {
                dispatch({type: authActionsConstants.UPDATE_NARRATION_DETAILS_SUCCESS, payload: response.data});
                Notification.success('Narration successfully updated!');
            })
            .catch((response) => {
                dispatch({type: authActionsConstants.UPDATE_NARRATION_DETAILS_ERROR, payload: response.data});
                Notification.error(response.response.data);
            });
    };
}