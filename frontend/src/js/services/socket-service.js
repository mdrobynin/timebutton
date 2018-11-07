import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class SocketService {
    
    constructor() {
        this.callbacks = [];
        this.socket = io(config.host);
        
        this.socket.on(constants.SOCKET_GET_CONNECTION_ID_ACTION_NAME, id => {
            this.playerId = id;
        });
        
        this.socket.on(constants.SOCKET_STATE_RECEIVE_ACTION_NAME, (event) => {
            this.callbacks.forEach(c => c(event));
        });
    }
    
    subscribeToStateChange(callback) {
        this.callbacks.push(callback);
    }
    
    join(playerName) {
        this.socket.emit(constants.SOCKET_JOIN_ACTION_NAME, { playerName, playerId: this.playerId });
    }

    leave() {
        this.socket.emit(constants.SOCKET_LEAVE_ACTION_NAME, { playerId: this.playerId });
    }

    emit(event) {
        this.socket.emit(constants.SOCKET_USER_ACTION_NAME, event);
    }
    
    reset() {
        this.socket.emit(constants.SOCKET_RESET_ACTION_NAME);
    }
}
