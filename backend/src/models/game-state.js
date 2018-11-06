class GameState {
    constructor() {
        this.players = [];
    }
    
    addPlayer(player) {
        this.players.push(player);
    }
    
    removePlayer(player) {
        this.players = this.players.filter(p => p.id !== player.id);
    }
}

module.exports = GameState;
