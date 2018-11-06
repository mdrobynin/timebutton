import { config } from '../config/config';
import { constants } from '../config/constants';
import { UserEventsObservable } from "../logic/user-events-observable";
import { SocketService } from "../services/socket-service";
import { Controller } from "../controllers/controller";

export class Initializer {
    constructor() {
        this.getConfig = this.getConfig.bind(this);
        this.join = this.join.bind(this);

        const loginButton = document.getElementById('login-button');
        const loginInput = document.getElementById('login-input');
        const loginForm = document.getElementById('login-form');
        
        loginButton.addEventListener('click', () => {
            if (loginInput.value && loginInput.value.length > 0) {
                this.join(loginInput.value);
            }
        });
    }

    getConfig() {
        return fetch(config.constantsUrl).then((constantsData) => {
            constantsData.json().then((constantsJson) => {
                Object.assign(constants, constantsJson);
            }); 
        });
    }

    join(playerName) {
        this.socketService = new SocketService();
        this.socketService.join(playerName);
        this.observable = new UserEventsObservable(this.socketService);
        this.controller = new Controller(this.observable, this.socketService);

        window.addEventListener('beforeunload', () => {
            alert(123);
            this.socketService.leave();
        });
    }
}
