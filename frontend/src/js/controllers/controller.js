export class Controller {
    constructor(observable, socketService) {
        this.observable = observable;
        this.socketService = socketService;

        this._listenSocketEvents();
    }

    _listenSocketEvents() {
        this.socketService.subscribeToSocketEvents((gameStateJson) => {
            const gameState = JSON.parse(gameStateJson);
            
            console.log(gameState, this.socketService.playerId);
        });
    }
}
