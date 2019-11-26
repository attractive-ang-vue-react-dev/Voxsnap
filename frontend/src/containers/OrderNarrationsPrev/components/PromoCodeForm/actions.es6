import { change } from 'redux-form';
import * as orderNarrationActionsConstants from '../../../../constants/actions/orderNarration.es6';
import * as orderNarrationService from '../../../../services/orderNarrationService.es6';
import Notification from '../../../../components/Notification/Notification.jsx';

export function validatePromoCode(code) {
    return dispatch => {
        dispatch({type: orderNarrationActionsConstants.VALIDATE_PROMO});
        dispatch(change('orderNarrationsForm', 'promo_code', null));

        orderNarrationService.validatePromo(code).then(response => {
            dispatch({type: orderNarrationActionsConstants.VALIDATE_PROMO_SUCCESS, payload: response.data});
            dispatch(change('orderNarrationsForm', 'promo_code', response.data.id));
        }).catch(errorResponse => {
            Notification.error(errorResponse.response.data);
        });
    };
}