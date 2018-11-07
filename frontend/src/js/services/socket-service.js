import io from 'socket.io-client';
import { config } from '../config/config';
import { constants } from '../config/constants';

export class SocketService {
    
    constructor() {
        this.loggedInCallbacks = [];
        this.socket = io(config.host);
        
        this.socket.on(constants.SOCKET_GET_CONNECTION_ID_ACTION_NAME, id => {
            this.playerId = id;
        });
        
        this.socket.on(constants.SOCKET_USER_LOGGED_IN_ACTION_NAME, (event) => {
            this.loggedInCallbacks.forEach(c => c(event));
        });
    }
    
    subscribeToUserLoggedIn(callback) {
        this.loggedInCallbacks.push(callback);
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

    subscribeToSocketEvents(callback) {
        this.socket.on(constants.SOCKET_STATE_RECEIVE_ACTION_NAME, (event) => {
            callback(event);
        });
    }
}
