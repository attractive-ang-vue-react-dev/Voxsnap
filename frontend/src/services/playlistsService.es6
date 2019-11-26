import baseService from './baseService.es6';

export function getPlaylists(searchParams) {
    return baseService.get('/playlists', {params: searchParams});
}
export function getPlaylistDetails(playlistId) {
    return baseService.get(`/playlists/${playlistId}`);
}

export function addPlaylist(data) {
    return baseService.post('/playlists/', data);
}

export function updatePlaylistDetails(formData) {
    return baseService.patch(`/playlists/${formData.id}/`, formData);
}
