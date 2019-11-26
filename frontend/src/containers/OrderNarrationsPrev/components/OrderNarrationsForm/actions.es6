//import {reset} from 'redux-form';

import * as orderNarrationActionsConstants from '../../../../constants/actions/orderNarration.es6';
import * as orderNarrationService from '../../../../services/orderNarrationService.es6';
import urls from '../../../../urls.es6';
import browserHistory from '../../../../history.es6';

import Notification from '../../../../components/Notification/Notification.jsx';

export function postOrder(data) {
    return dispatch => {
        dispatch({type: orderNarrationActionsConstants.POST_ORDER});

        orderNarrationService.postOrder(data).then(response => {
            dispatch({type: orderNarrationActionsConstants.POST_ORDER_SUCCESS, payload: response.data});
            //dispatch(reset('orderNarrationsForm'));
            browserHistory.push(urls.orderComplete);
        }).catch(errorResponse => {
            Notification.error(errorResponse.response.data);
        });
    };
}
