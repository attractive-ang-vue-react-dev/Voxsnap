import baseService from './baseService.es6';

export function getNarrators() {
    return baseService.get('/narrator/');
}

export function getPostData(data) {
    return baseService.post('/word-count/', {url: data});
}

export function postOrder(data) {
    return baseService.post('/order/', data);
}

export function validatePromo(data) {
    return baseService.post('/validate-promo-code/', data);
}