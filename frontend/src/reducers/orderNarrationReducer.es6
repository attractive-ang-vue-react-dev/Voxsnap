import * as orderNarrationActionsConstants from '../constants/actions/orderNarration.es6';

const initialState = {
    narrators: [],
    isPlayingNarrator: false,
    narratorSampleUrl: '',
    promoCode: {}
};

const orderNarrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case orderNarrationActionsConstants.GET_NARRATORS_SUCCESS:
            return {
                ...state,
                narrators: action.payload
            };
        case orderNarrationActionsConstants.PLAY_PAUSE_NARRATOR:
            const narratorSampleUrl = action.payload.sample_url;
            const isPlayingNarrator = narratorSampleUrl !== state.narratorSampleUrl || !state.isPlayingNarrator;
            return {
                ...state,
                isPlayingNarrator,
                narratorSampleUrl
            };
        case orderNarrationActionsConstants.VALIDATE_PROMO:
            return {
                ...state,
                promoCode: {}
            };
        case orderNarrationActionsConstants.VALIDATE_PROMO_SUCCESS:
            return {
                ...state,
                promoCode: action.payload
            };
        default:
            return state;
    }
};

export default orderNarrationReducer;
