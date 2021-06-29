import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASEAPI);

const SOCKET_EVENTS = {
    NEW_NOTIFICATIONS: 'NEW_NOTIFICATIONS',
    JOIN_NOTIFICATIONS: 'JOIN_NOTIFICATIONS',
    HANDLE_NOTIFICATION: 'HANDLE_NOTIFICATION',
    NOTIFICATION_UPDATED: 'NOTIFICATION_UPDATED',
};

export const join = (user_type, user_id, organization_id) => {
    socket.emit(SOCKET_EVENTS.JOIN_NOTIFICATIONS, { user_type: 'member', user_id: '60b76d175b6b98086914d452', organization_id: '60b76cf95b6b98086914d44b' });
};

export const onJoin = setNotifications => {
    socket.on(SOCKET_EVENTS.JOIN_NOTIFICATIONS, val => {
        setNotifications(val.notifications.reverse());
    });
};

export const handleNotification = id => {
    socket.emit(SOCKET_EVENTS.HANDLE_NOTIFICATION, { id });
};

export const onUpdate = () => {
    socket.on(SOCKET_EVENTS.NOTIFICATION_UPDATED, val => {
        console.log('A Notification has been handled', val);
    });
};

export const onNewNotification = setNotifications => {
    socket.on(SOCKET_EVENTS.NEW_NOTIFICATIONS, val => {
        setNotifications(prevNotifications => [...prevNotifications.filter(el => el.id !== val.notification.id), val.notification].reverse());
    });
};

export const disconnectSocket = () => socket.disconnect();
