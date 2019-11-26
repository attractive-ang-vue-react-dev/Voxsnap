import baseService from './baseService.es6';

export function getAdditionalServices() {
    return baseService.get('/additional-services');
}
