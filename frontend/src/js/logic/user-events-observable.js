export class UserEventsObservable {
    constructor(socketService) {
        this.observers = [];
        this.socketService = socketService;
    }

    //CALL THIS
    fireEvent(event, thisObj) {
        const scope = thisObj || window;

        this.socketService.emit(event);

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
}
