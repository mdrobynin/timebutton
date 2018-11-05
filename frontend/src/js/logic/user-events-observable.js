import { Helpers } from '../utils/helpers';

export class UserEventsObservable {
    constructor(socketService, roomName) {
        this.roomName = roomName;
        this.observers = [];
        this.canSendToServer = true;
        this._userKeyUp = this._userKeyUp.bind(this);
        this._userKeyDown = this._userKeyDown.bind(this);
        this.listenUserEvents();
        this.socketService = socketService;
    }

    fireEvent(event, thisObj) {
        const scope = thisObj || window;

        if (this.canSendToServer) {
            this.socketService.emit(event);
        }
        this.observers.forEach(observer => {
            observer.call(scope, event);
        });
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obsItem => obsItem !== observer);
    }

    listenUserEvents() {
        document.addEventListener('keydown', this._userKeyDown);
        document.addEventListener('keyup', this._userKeyUp);
    }

    _userKeyDown(event) {
        const userEvent = Helpers.getUserEventObject(event.keyCode, true, this.roomName);

        if (userEvent) {
            this.fireEvent(userEvent);
        }
    }

    _userKeyUp(event) {
        const userEvent = Helpers.getUserEventObject(event.keyCode, false, this.roomName);

        if (userEvent) {
            this.fireEvent(userEvent);
        }
    }
}
