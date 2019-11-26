import baseService from './baseService.es6';

export function getNarrations(searchParams) {
    return baseService.get('/narrations', {params: searchParams});
}
export function getNarrationDetails(narrationId) {
    return baseService.get(`/narrations/${narrationId}`);
}

export function updateNarrationDetails(formData) {
    return baseService.patch(`/narrations/${formData.id}`, formData);
}

export function searchNarrations(q) {
    return baseService.get('/narrations', {params: {q}});
}