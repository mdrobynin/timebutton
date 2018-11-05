import { TerrainView } from '../view/terrain-view';
import { PlayerView } from '../view/player-view';
import { BulletView } from '../view/bullet-view';
import { ImageSource } from "../utils/image-source";
import { config } from "../config/config";

export class ViewState {
    constructor(contextTerrain, contextPlayers) {
        this.contextTerrain = contextTerrain;
        this.contextPlayers = contextPlayers;
        this.imageSource = new ImageSource();
        this.players = [];
        this.terrain = [];
        this.bullets = [];
    }

    mapGameStateForPlayers(gameState) {
        this.players = gameState.players.map(p => new PlayerView(p, this.contextPlayers));
        this.bullets = gameState.bullets.map(b => new BulletView(b, this.contextPlayers));
    }

    mapGameStateForTerrain(gameState) {
        this.terrain = gameState.terrain.map(tarr =>
            tarr.map(t => new TerrainView(t, this.contextTerrain, this.imageSource))
        );
    }

    renderTerrain() {
        this.terrain.forEach(tarr => tarr.forEach(t => t.render()));
    }

    renderPlayers() {
        this.bullets.forEach(b => b.render());
        this.players.forEach(p => p.render());
    }

    clearTerrainCanvas() {
        this.contextTerrain.clearRect(0, 0, config.CANVAS_SIZE, config.CANVAS_SIZE);
    }

    clearPlayersCanvas() {
        this.contextPlayers.clearRect(0, 0, config.CANVAS_SIZE, config.CANVAS_SIZE);
    }
}
