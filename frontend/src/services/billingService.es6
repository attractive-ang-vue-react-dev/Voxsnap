import baseService from './baseService.es6';

export function getTransactions(searchParams) {
    return baseService.get('/billing', {params: searchParams});
}
