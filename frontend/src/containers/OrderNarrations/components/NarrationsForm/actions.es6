import { change } from 'redux-form';
import * as orderNarrationActionsConstants from '../../../../constants/actions/orderNarration.es6';
import { isUrl } from '../../../../utils/helperFunctions.es6';
import * as orderNarrationService from '../../../../services/orderNarrationService.es6';
import Notification from '../../../../components/Notification/Notification.jsx';

export function getNarrators() {
    return dispatch => {
        dispatch({type: orderNarrationActionsConstants.GET_NARRATORS});

        orderNarrationService.getNarrators().then(response => {
            dispatch({type: orderNarrationActionsConstants.GET_NARRATORS_SUCCESS, payload: response.data.results});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}

export function playPauseNarrator(narratorObj) {
    return dispatch => {
        dispatch({
            type: orderNarrationActionsConstants.PLAY_PAUSE_NARRATOR,
            payload: narratorObj
        });
    };
}

export function getPostData(value, index) {
    return dispatch => {
        dispatch({
            type: orderNarrationActionsConstants.GET_POST_DATA,
            payload: {
                value,
                index
            }
        });

        if (isUrl(value)) {
            orderNarrationService.getPostData(value).then(response => {
                dispatch(change('orderNarrationsForm', `narrations[${index}].words`, response.data.wordcount));
            }).catch(errorResponse => {
                Notification.error(errorResponse.response.data);
            });
        }
    };
}
