import baseService from './baseService.es6';

const restAuthPrefix = '/rest-auth/';

export function login(data) {
    return baseService.post('api-token-auth/', data);
}

export function logout() {
    return baseService.post(`${restAuthPrefix}logout/`);
}

export function passwordReset(data) {
    return baseService.post(`${restAuthPrefix}password/reset/`, data);
}

export function passwordChange(data) {
    return baseService.post(`${restAuthPrefix}password/change/`, data);
}

export function getUserData() {
    return baseService.get('/me/');
}

export function getUserDetails() {
    return baseService.get('/user-details/');
}

export function updateUserDetails(data) {
    return baseService.put('/user-details/', data);
}
