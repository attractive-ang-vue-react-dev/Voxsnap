import * as narrationService from '../../../../services/narrationsService.es6';
import * as narrationActionsConstants from '../../../../constants/actions/narrations.es6';

export function getNarrations(searchParams) {
    return dispatch => {
        dispatch({type: narrationActionsConstants.GET_NARRATIONS});

        narrationService.getNarrations(searchParams).then(response => {
            dispatch({type: narrationActionsConstants.GET_NARRATIONS_SUCCESS, payload: response.data});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}