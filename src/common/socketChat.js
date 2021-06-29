import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_BASEAPI);

const SOCKET_EVENTS = {
    JOIN: 'JOIN',
    JOINED: 'JOINED',
    SEND_MESSAGE: 'SEND_MESSAGE',
    MESSAGE_RECIEVED: 'MESSAGE_RECIEVED',
    LEFT: 'LEFT',
    CREATE_TICKET: 'CREATE_TICKET',
    END_TICKET: 'END_TICKET',
    LEAVE: 'LEAVE',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    CHATS_UPDATED: 'CHATS_UPDATED',
    JOIN_ROOM: 'JOIN_ROOM',
    LEAVE_ROOM: 'LEAVE_ROOM',
    TICKET_CREATED: 'TICKET_CREATED',
    TICKET_ENDED: 'TICKET_ENDED',
    MESSAGE_SEEN: 'MESSAGE_SEEN',
};

export const sendMessage = (message, files, id, type) => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { message, files, id, type: type || 'conversation' });
};

export const join = (user_type, user_id, organization_id) => {
    socket.emit(SOCKET_EVENTS.JOIN, { user_type, user_id, organization_id });
};

export const onJoin = (setAllChats, setFilteredChats, setCurrentChatIdx, isTicket) => {
    socket.on(SOCKET_EVENTS.JOIN, val => {
        if (isTicket) {
            setAllChats(val.tickets);
            setFilteredChats(val.tickets);
            if (val.tickets.length) {
                setCurrentChatIdx(val.tickets[0]._id);
                joinRoom(val.tickets[0]._id);
            }
        } else {
            setAllChats(val.conversations);
            setFilteredChats(val.conversations);
            if (val.conversations.length) {
                setCurrentChatIdx(val.conversations[0]._id);
                joinRoom(val.conversations[0]._id);
            }
        }
    });
};

export const joinRoom = id => {
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, { id });
};

export const onRoomJoin = () => {
    socket.on(SOCKET_EVENTS.JOINED, val => {
        // console.log('Someone Joined', val);
    });
};

export const onChatsUpdate = callback => {
    socket.on(SOCKET_EVENTS.CHATS_UPDATED, val => {
        callback(val);
    });
};

export const onMessageRecieved = setCurrentChat => {
    socket.on(SOCKET_EVENTS.MESSAGE_RECIEVED, val => {
        setCurrentChat(val.message);
    });
};

export const endTicket = id => {
    socket.emit(SOCKET_EVENTS.END_TICKET, { id });
};

export const onMessageSeen = callback => {
    socket.on(SOCKET_EVENTS.MESSAGE_SEEN, val => {
        callback(val);
    });
};

export const onTicketEnded = callback => {
    socket.on(SOCKET_EVENTS.TICKET_ENDED, val => {
        callback(val.ticket);
    });
};

export const createTicket = (subject, organization_id, message) => {
    socket.emit(SOCKET_EVENTS.CREATE_TICKET, { subject, organization_id, message, files: [] });
};

export const onTicketCreated = (setAllChats, setFilteredChats, setCurrentChatIdx) => {
    socket.on(SOCKET_EVENTS.TICKET_CREATED, val => {
        setAllChats(val.ticket);
        setFilteredChats(val.ticket);
        setCurrentChatIdx(val.ticket._id);
    });
};

export const leaveRoom = id => {
    socket.emit(SOCKET_EVENTS.LEAVE_ROOM, { id });
};

export const disconnectSocket = () => socket.disconnect();
