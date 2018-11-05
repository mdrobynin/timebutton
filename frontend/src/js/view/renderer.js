import { ViewState } from '../models/view-state';
import { config } from '../config/config';

export class Renderer {
    constructor() {
        this.contextPlayers = document.getElementById('canvas-players').getContext('2d');
        this.contextTerrain = document.getElementById('canvas-terrain').getContext('2d');
        this.viewState = new ViewState(this.contextTerrain, this.contextPlayers);
        this.isInitiallyRendered = false;
    }

    render(gameState, isPlayerDead, playerId) {
        if (isPlayerDead) {
            this._showDeathScreen();
        } else {
            this._renderTerrain(gameState);
            this._renderPlayers(gameState);

            //_renderScore
        }
    }

    _renderTerrain(gameState) {
        if (gameState.barriersToDelete.length > 0 || !this.isInitiallyRendered) {
            this.viewState.mapGameStateForTerrain(gameState);
            this.viewState.clearTerrainCanvas();
            this.viewState.renderTerrain();
            this.isInitiallyRendered = true;
        }
    }

    _renderPlayers(gameState) {
        this.viewState.mapGameStateForPlayers(gameState);
        this.viewState.clearPlayersCanvas();
        this.viewState.renderPlayers();
    }

    _renderScore(score) {
        const context = this.contextPlayers;

        context.fillStyle = '#000000';
        context.font = '12px Arial';
        context.fillText(`Score: ${  score}`, config.CANVAS_SIZE - 50, 12);
    }

    _showDeathScreen() {
        const context = this.contextPlayers;

        context.fillStyle = '#000000';
        context.fillRect(0, config.CANVAS_SIZE / 2 - 70, config.CANVAS_SIZE, 100);
        context.fillStyle = '#FF0000';
        context.font = '60px Optimus Princeps';
        context.fillText('YOU DIED', config.CANVAS_SIZE / 2 - 150, config.CANVAS_SIZE / 2);
    }
}
