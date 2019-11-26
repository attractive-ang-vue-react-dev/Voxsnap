import baseService from './baseService.es6';

export function getNotifications(pageNumber) {
    return baseService.get(`/notifications/?page=${pageNumber}`);
}

export function getUnreadNotificationsCount() {
    return baseService.get('/notifications/unread-count/');
}

export function markAllNotificationsRead() {
    return baseService.get('/notifications/mark-all-notifications-read/');
}