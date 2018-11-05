import { Renderer } from '../view/renderer';
import { constants } from '../config/constants';

export class Controller {
    constructor(observable, socketService) {
        this.observable = observable;
        this.renderer = new Renderer();
        this.socketService = socketService;
        this.isPlayerDead = false;
        this._checkForRestartGameEvent = this._checkForRestartGameEvent.bind(this);
        this._listenSocketEvents();
    }

    _listenSocketEvents() {
        this.socketService.subscribeToSocketEvents(eventJson => {
            const event = JSON.parse(eventJson);

            this._checkIfPlayerWasKilled(event);
            this.renderer.render(event, this.isPlayerDead, this.socketService.playerId);
        });
    }

    _checkIfPlayerWasKilled(event) {
        if (event.playersToDelete.map(p => p.id).indexOf(this.socketService.playerId) !== -1) {
            this.isPlayerDead = true;
            this.observable.canSendToServer = false;
            this.observable.subscribe(this._checkForRestartGameEvent);
        }
    }

    _checkForRestartGameEvent(event) {
        if (event.name === constants.CLICK_EVENTS.FIRE) {
            this.observable.unsubscribe(this._checkForRestartGameEvent);
            this.socketService.reconnectAfterDeath();
            this.isPlayerDead = false;
            this.observable.canSendToServer = true;
        }
    }
}
