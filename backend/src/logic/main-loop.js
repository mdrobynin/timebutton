const {
    SOCKET_STATE_RECEIVE_ACTION_NAME
} = require('../config/constants');

class MainLoop {
    constructor(gameState, io) {
        this.gameState = gameState;
        this.callbacks = [];
        this._run(io);
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    removeCallback(callback) {
        this.callbacks = this.callbacks.filter(c => c !== callback);
    }

    _run(io) {
        setInterval(() => {
            const gameState = JSON.stringify(this.gameState);

            this.callbacks.forEach(c => c());
            io.emit(SOCKET_STATE_RECEIVE_ACTION_NAME, gameState);
        }, 1000 / 5);
    }
}

module.exports = MainLoop;
