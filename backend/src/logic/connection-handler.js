const {
    SOCKET_GET_CONNECTION_ID_ACTION_NAME,
    SOCKET_JOIN_ACTION_NAME,
    SOCKET_LEAVE_ACTION_NAME
} = require('../config/constants');
const UserEventsObservable = require('./user-events-observable');

class ConnectionHandler {
    constructor (gameState, controller) {
        this.controller = controller;
        this.gameState = gameState;
        this.connections = [];
    }

    initialize(io) {
        this._addSocketEventHandlers(io);
    }

    _addSocketEventHandlers(io) {
        io.on('connection', (socket) => {
            socket.emit(SOCKET_GET_CONNECTION_ID_ACTION_NAME, socket.id);

            socket.on(SOCKET_JOIN_ACTION_NAME, (player) => {
                const observable = new UserEventsObservable(socket);
                const { playerName, playerId } = player;
                
                this.controller.addPlayer(playerId, playerName, observable);
            });

            socket.on(SOCKET_LEAVE_ACTION_NAME, () => {
                if (player) {
                    this.gameState.removePlayer(player);
                }
            });
        });
    }
}

module.exports = ConnectionHandler;
