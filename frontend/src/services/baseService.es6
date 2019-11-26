import axios from 'axios';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const authHeader = 'Authorization';
const authCookieName = 'jwtToken'; // used only for storing the token between different user visits

export const baseUrl = '/api/v1';

const baseService = axios.create({
    baseURL: baseUrl
});

baseService.addAuthToken = (token) => {
    // todo use secure cookies in production (based on the env state)
    // Cookies.set(authCookieName, token, {'secure': true});
    Cookies.set(authCookieName, token);
    baseService.defaults.headers.common[authHeader] = `JWT ${token}`;
};

baseService.removeAuthToken = () => {
    Cookies.remove(authCookieName);
    baseService.defaults.headers.common[authHeader] = '';
};

baseService.isUserAuthenticated = () => {
    let cookieToken = Cookies.get(authCookieName, false);
    if (cookieToken) {
        let jwtExp = jwtDecode(cookieToken).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if (new Date() < expiryDate) {
            return true;
        }
    }

    return false;
};

if (Cookies.get(authCookieName)) {
    baseService.defaults.headers.common[authHeader] = `JWT ${Cookies.get(authCookieName)}`;
}

baseService.interceptors.response.use((config) => {
    return config;
}, (error) => {
    if (error.response.status === 401) {
        baseService.removeAuthToken();
    }
    return window.Promise.reject(error);
});

export const getCSRFToken = () => {
    const firstItem = 0;
    return Cookies.get('csrftoken') || document.getElementsByName('csrfmiddlewaretoken')[firstItem].value;
};

baseService.defaults.headers.common['X-CSRFToken'] = getCSRFToken();

export default baseService;
