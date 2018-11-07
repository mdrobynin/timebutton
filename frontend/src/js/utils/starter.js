import { config } from '../config/config';
import { constants } from '../config/constants';
import { UserEventsObservable } from "../logic/user-events-observable";
import { SocketService } from "../services/socket-service";
import { Controller } from "../controllers/controller";

export class Starter {
    constructor() {
        this.getConfig = this.getConfig.bind(this);
        this.connect = this.connect.bind(this);
        this.userLoggedInHandler = this.userLoggedInHandler.bind(this);
        this.userIsLoggingInHandler = this.userIsLoggingInHandler.bind(this);

        const loginButton = document.getElementById('login-button');
        const loginInput = document.getElementById('login-input');
        const readyButton = document.getElementById('ready-button');
        
        window.addEventListener('beforeunload', () => {
            this.socketService.leave();
        });
        
        readyButton.addEventListener('click', () => {
            this.socketService.emit({ playerId: this.socketService.playerId });
        });
        
        loginButton.addEventListener('click', () => {
            if (loginInput.value && loginInput.value.length > 0) {
                this.userIsLoggingInHandler();
                this.socketService.join(loginInput.value);
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
    
    userIsLoggingInHandler() {
        const foreground = document.getElementById('login-form-foreground');

        foreground.classList.add('login-form__card-foreground_visible');
    }

    userLoggedInHandler(playersArray) {
        const loginForm = document.getElementById('login-form');
        const playersList = document.getElementById('players-list');
        
        loginForm.classList.add('login-form_hidden');

        playersList.innerHTML = '';
        playersArray.forEach((player) => {
            const playerListElement = document.createElement('div');
            const playerListElementName = document.createElement('div');
            playerListElement.classList.add('player-list-item');
            if (player.buttonPressed) {
                playerListElement.classList.add('player-list-item_ready');
            }
            playerListElementName.classList.add('player-list-item__name');
            playerListElement.appendChild(playerListElementName);
            playerListElementName.innerText = player.name;
            playersList.appendChild(playerListElement);
        });
    }

    connect() {
        this.socketService = new SocketService();
        this.observable = new UserEventsObservable(this.socketService);
        this.controller = new Controller(this.observable, this.socketService);
        
        this.socketService.subscribeToUserLoggedIn(this.userLoggedInHandler);
    }
}
