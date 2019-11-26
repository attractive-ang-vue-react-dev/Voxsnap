import * as billingService from '../../services/billingService.es6';
import * as billingActionsConstants from '../../constants/actions/billing.es6';

export function getTransactions(searchParams) {
    return dispatch => {
        dispatch({type: billingActionsConstants.GET_TRANSACTIONS});

        billingService.getTransactions(searchParams).then(response => {
            dispatch({type: billingActionsConstants.GET_TRANSACTIONS_SUCCESS, payload: response.data});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}