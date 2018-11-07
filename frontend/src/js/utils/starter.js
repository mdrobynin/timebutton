import { config } from '../config/config';
import { constants } from '../config/constants';
import { SocketService } from "../services/socket-service";

export class Starter {
    constructor() {
        this.getConfig = this.getConfig.bind(this);
        this.connect = this.connect.bind(this);
        this.userLoggedInHandler = this.userLoggedInHandler.bind(this);
        this.userIsLoggingInHandler = this.userIsLoggingInHandler.bind(this);

        const loginButton = document.getElementById('login-button');
        const loginInput = document.getElementById('login-input');
        const readyButton = document.getElementById('ready-button');
        const resetButton = document.getElementById('reset-button');
        
        window.addEventListener('beforeunload', () => {
            this.socketService.leave();
        });
        
        readyButton.addEventListener('click', () => {
            const player = this.playersArray.find(p => p.id === this.socketService.playerId);

            if (player && !player.buttonPressed) {
                this.socketService.emit({ playerId: this.socketService.playerId });
            }
        });
        
        loginButton.addEventListener('click', () => {
            if (loginInput.value && loginInput.value.length > 0) {
                this.userIsLoggingInHandler();
                this.socketService.join(loginInput.value);
            }
        });
        
        resetButton.addEventListener('click', () => {
            this.socketService.reset();
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
        this.playersArray = playersArray;

        if (this.playersArray.map(p => p.id).includes(this.socketService.playerId)) {
            const loginForm = document.getElementById('login-form');
            const mainScreen = document.getElementById('main-screen');

            loginForm.classList.add('login-form_hidden');
            mainScreen.classList.add('main-screen_visible');

            this._renderPlayersList();
            this._checkUserCanClickReady();
        }
    }

    connect() {
        this.socketService = new SocketService();
        
        this.socketService.subscribeToStateChange(this.userLoggedInHandler);
    }
    
    _renderPlayersList(p) {
        const playersList = document.getElementById('players-list');

        playersList.innerHTML = '';
        this.playersArray.forEach((player) => {
            const playerListElement = document.createElement('div');
            const playerListElementName = document.createElement('div');
            
            playerListElement.classList.add('player-list-item');
            
            if (player.buttonPressed) {
                playerListElement.classList.add('player-list-item_ready');
            }
            
            if (player.order) {
                const playerListElementOrder = document.createElement('div');
                playerListElementOrder.classList.add('player-list-item__order');
                playerListElementOrder.innerText = player.order;
                playerListElement.appendChild(playerListElementOrder);
            }
            
            playerListElementName.classList.add('player-list-item__name');
            playerListElement.appendChild(playerListElementName);
            playerListElementName.innerText = player.name;
            playersList.appendChild(playerListElement);
        });
    }
    
    _checkUserCanClickReady() {
        const player = this.playersArray.find(p => p.id === this.socketService.playerId);

        if (player) {
            const readyButton = document.getElementById('ready-button');

            if (player.buttonPressed) {
                readyButton.classList.add('main-screen__body-ready-button_disabled');
            } else {
                readyButton.classList.remove('main-screen__body-ready-button_disabled');
            }
        }
    }
}
