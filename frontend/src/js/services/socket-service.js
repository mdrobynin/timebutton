import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class SocketService {
    joinRoom(roomName) {
        this.socket = io(config.host);
        this.roomName = roomName;
        this.socket.emit(constants.SOCKET_JOIN_ROOM_ACTION_NAME, roomName);
        this.socket.on(constants.SOCKET_GET_CONNECTION_ID_ACTION_NAME, id => this.playerId = id);
    }

    reconnectAfterDeath() {
        this.socket.emit(constants.SOCKET_JOIN_ROOM_ACTION_NAME, this.roomName);
        this.socket.on(constants.SOCKET_GET_CONNECTION_ID_ACTION_NAME, id => this.playerId = id);
    }

    leaveRoom(callback) {
        if (this.roomName) {
            this.socket.emit(constants.SOCKET_LEAVE_ROOM_ACTION_NAME, this.roomName, callback);
        }
        this.roomName = undefined;
    }

    emit(event) {
        this.socket.emit(constants.SOCKET_USER_ACTION_NAME, event);
    }

    subscribeToSocketEvents(callback) {
        this.socket.on(constants.SOCKET_STATE_RECEIVE_ACTION_NAME, eventJSON => {
            callback(eventJSON);
        });
    }
}
