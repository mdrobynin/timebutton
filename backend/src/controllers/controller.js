const PlayerState = require('../models/player-state');

class Controller {
    constructor(gameState) {
        this.gameState = gameState;
        this.players = gameState.players;
    }

    addPlayer(playerId, playerName, observable) {
        const playerState = new PlayerState(playerId, playerName);
        this.gameState.addPlayer(playerState);
        this.players = this.gameState.players;

        observable.subscribe((event) => {
            console.log('controller', event);
        });
    }

    handleMainTick() {
        this.players.forEach(player => {
            //console.log('controller', player);
            // if (player.isMoving) {
            //     const { rightPoint, leftPoint } = getPlayerFrontPoints(player.coordinates, player.direction);
            //     const terrain1 = this.gameState.getTerrainInDirection(rightPoint, player.direction);
            //     const terrain2 = this.gameState.getTerrainInDirection(leftPoint, player.direction);

            //     player.move(player.direction, terrain1, terrain2);
            // }
        });
    }
}

module.exports = Controller;
