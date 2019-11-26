import * as authActionsConstants from '../../../../constants/actions/narrations.es6';
import * as narrationsService from '../../../../services/narrationsService.es6';

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