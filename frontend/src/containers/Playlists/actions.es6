import * as playlistsService from '../../services/playlistsService.es6';
import * as playlistsActionsConstants from '../../constants/actions/playlists.es6';
import history from '../../history.es6';
import urls from '../../urls.es6';
import Notification from '../../components/Notification/Notification.jsx';

export function getPlaylistDetails(playlistId) {
    return dispatch => {
        dispatch({type: playlistsActionsConstants.GET_PLAYLIST_DETAILS});

        playlistsService.getPlaylistDetails(playlistId).then(response => {
            dispatch({type: playlistsActionsConstants.GET_PLAYLIST_DETAILS_SUCCESS, payload: response.data});
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}

export function addPlaylist(data) {
    return dispatch => {
        dispatch({type: playlistsActionsConstants.ADD_PLAYLIST});
        playlistsService.addPlaylist(data).then(() => {
            history.push(urls.playlists);
        }).catch(errorResponse => {
            alert(JSON.stringify(errorResponse.response.data));
        });
    };
}

export function updatePlaylist(data) {
    return dispatch => {
        dispatch({type: playlistsActionsConstants.UPDATE_PLAYLIST_DETAILS});
        playlistsService.updatePlaylistDetails(data)
            .then((response) => {
                dispatch({type: playlistsActionsConstants.UPDATE_PLAYLIST_DETAILS_SUCCESS, payload: response.data});
                Notification.success('Playlist successfully updated!');
            })
            .catch(errorResponse => {
                alert(JSON.stringify(errorResponse.response.data));
            });
    };
}

export function clearPlaylistDetails() {
    return dispatch => {
        dispatch({type: playlistsActionsConstants.CLEAR_PLAYLIST_DETAILS});
    };
}