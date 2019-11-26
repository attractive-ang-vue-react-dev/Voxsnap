import * as distributionsActionsConstants from '../constants/actions/distribution.es6';

const initialState = {
    additionalServicesList: [],
    additionalServicesLoading: true
};

const additionalServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case distributionsActionsConstants.GET_ADDITIONAL_SERVICES:
            return {
                ...state,
                additionalServicesLoading: true
            };
        case distributionsActionsConstants.GET_ADDITIONAL_SERVICES_SUCCESS:
            return {
                ...state,
                additionalServicesLoading: false,
                additionalServicesList: action.payload.results
            };

        default:
            return state;
    }
};

export default additionalServiceReducer;
