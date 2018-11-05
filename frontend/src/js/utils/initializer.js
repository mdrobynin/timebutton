import { TransportService } from '../services/transport-service';
import { config } from '../config/config';
import { constants } from '../config/constants';
import { Helpers } from '../utils/helpers';
import { Connection } from '../logic/connection';
import io from 'socket.io-client';

export class Initializer {
    constructor() {
        this.roomsElement = document.getElementById('rooms');
        this.canvasWrapperElement = document.getElementById('canvas-wrapper');
        this.leaveRoomElement = document.getElementById('leave-room');
        this.roomsContainerElement = document.getElementById('rooms-container');
        this.canvasContainerElement = document.getElementById('canvas-container');
        this.canvasTerrain = document.getElementById('canvas-terrain');
        this.canvasPlayers = document.getElementById('canvas-players');
        this.abortConnection = this.abortConnection.bind(this);
        this.createRoomHandler = this.createRoomHandler.bind(this);
        this.onRoomJoin = this.onRoomJoin.bind(this);

        document.getElementById('create-room').addEventListener('click', this.createRoomHandler);
    }

    async getConfig() {
        const configData = await TransportService.getConfig();
        const constantsData = await TransportService.getConstants();
        const configJson = await configData.json();
        const constantsJson = await constantsData.json();

        Object.assign(config, configJson);
        Object.assign(constants, constantsJson);
    }

    showCurrentPlayersOnline() {
        io(config.host).on(constants.SOCKET_CURRENT_ONLINE_PLAYERS_ACTION, res => {
            const playersPerRoom = JSON.parse(res);
            const roomNames = playersPerRoom.map(x => x.room);

            [].slice.call(this.roomsContainerElement.children).forEach(room => {
                if (roomNames.indexOf(room.dataset.roomName) !== -1) {
                    const row = playersPerRoom.find(x => x.room === room.dataset.roomName);

                    if (row) {
                        const text = `Players: ${  row.players}`;

                        room.querySelector('.room__players').textContent = text;
                    }
                }
            });
        });
    }

    setCanvasSize() {
        this.canvasContainerElement.style.width = `${config.CANVAS_SIZE  }px`;
        this.canvasContainerElement.style.height = `${config.CANVAS_SIZE  }px`;
        this.canvasTerrain.width = config.CANVAS_SIZE;
        this.canvasTerrain.height = config.CANVAS_SIZE;
        this.canvasPlayers.width = config.CANVAS_SIZE;
        this.canvasPlayers.height = config.CANVAS_SIZE;
    }

    toggleVisibility() {
        this.roomsElement.classList.toggle('no-display');
        this.canvasWrapperElement.classList.toggle('no-display');
        this.leaveRoomElement.classList.toggle('no-display');
    }

    async onRoomJoin(roomName) {
        this.setCanvasSize();
        this.toggleVisibility();
        this.connection = new Connection(roomName);
        this.leaveRoomElement.addEventListener('click', await this.abortConnection);
        window.addEventListener('beforeunload', () => {
            if (this.connection) {
                this.connection.abort();
            }
        });
    }

    async abortConnection() {
        this.connection.abort();
        await this.loadRooms();
        this.toggleVisibility();
    }

    async createRoomHandler() {
        await TransportService.addRoom();
        await this.loadRooms();
    }

    async loadRooms() {
        while (this.roomsContainerElement.firstChild) {
            this.roomsContainerElement.removeChild(this.roomsContainerElement.firstChild);
        }

        const roomsData = await TransportService.getRooms();
        const roomsJson = await roomsData.json();

        Helpers.createRoomElementsByJSON(roomsJson, this.onRoomJoin).forEach(room => {
            this.roomsContainerElement.appendChild(room);
        });
    }
}
