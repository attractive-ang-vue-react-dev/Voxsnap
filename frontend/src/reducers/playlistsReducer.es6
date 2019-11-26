import * as playlistsActionsConstants from '../constants/actions/playlists.es6';

const initialState = {
    playlists: [],
    playlistsLoading: true,
    playlistDetails: {}
};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case playlistsActionsConstants.GET_PLAYLISTS:
            return {
                ...state,
                playlistsLoading: true
            };
        case playlistsActionsConstants.GET_PLAYLISTS_SUCCESS:
            return {
                ...state,
                playlistsLoading: false,
                playlists: action.payload.results
            };
        case playlistsActionsConstants.GET_PLAYLIST_DETAILS:
            return {
                ...state,
                playlistDetails: {}
            };
        case playlistsActionsConstants.GET_PLAYLIST_DETAILS_SUCCESS:
            return {
                ...state,
                playlistDetails: action.payload
            };
        case playlistsActionsConstants.CLEAR_PLAYLIST_DETAILS:
            return {
                ...state,
                playlistDetails: {}
            };
        default:
            return state;
    }
};

export default playlistsReducer;
