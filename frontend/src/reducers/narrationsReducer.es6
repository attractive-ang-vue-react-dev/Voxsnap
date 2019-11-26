import * as narrationsActionsConstants from '../constants/actions/narrations.es6';

const initialState = {
    narrationsList: [],
    narrationsLoading: true,
    narrationDetails: {}
};

const narrationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case narrationsActionsConstants.GET_NARRATIONS:
            return {
                ...state,
                narrationsLoading: true
            };
        case narrationsActionsConstants.GET_NARRATIONS_SUCCESS:
            return {
                ...state,
                narrationsLoading: false,
                narrationsList: action.payload.results
            };
        case narrationsActionsConstants.GET_NARRATION_DETAILS:
            return {
                ...state,
                narrationDetails: {}
            };
        case narrationsActionsConstants.GET_NARRATION_DETAILS_SUCCESS:
            return {
                ...state,
                narrationDetails: action.payload
            };
        default:
            return state;
    }
};

export default narrationsReducer;
