import * as billingActionsConstants from '../constants/actions/billing.es6';

const initialState = {
    transactionsList: [],
    transactionsLoading: true
};

const billingReducer = (state = initialState, action) => {
    switch (action.type) {
        case billingActionsConstants.GET_TRANSACTIONS:
            return {
                ...state,
                transactionsLoading: true
            };
        case billingActionsConstants.GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactionsLoading: false,
                transactionsList: action.payload.results
            };
        default:
            return state;
    }
};

export default billingReducer;
