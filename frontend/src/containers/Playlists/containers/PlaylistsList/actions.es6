import * as playlistsService from '../../../../services/playlistsService.es6';
import * as playlistsActionsConstants from '../../../../constants/actions/playlists.es6';

export function getPlaylists(searchParams) {
    return dispatch => {
        dispatch({type: playlistsActionsConstants.GET_PLAYLISTS});

        playlistsService.getPlaylists(searchParams).then(response => {
            dispatch({type: playlistsActionsConstants.GET_PLAYLISTS_SUCCESS, payload: response.data});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}