import { constants } from '../config/constants';
import { config } from '../config/config';
import { UserEvent } from '../models/user-event';

export class Helpers {
    static getUserEventObject(keyCode, status, roomName) {
        const { UP, DOWN, LEFT, RIGHT, FIRE } = constants.CLICK_EVENTS;

        switch (keyCode) {
            case config.KEY_UP:
                return new UserEvent(UP, status, roomName);
            case config.KEY_DOWN:
                return new UserEvent(DOWN, status, roomName);
            case config.KEY_LEFT:
                return new UserEvent(LEFT, status, roomName);
            case config.KEY_RIGHT:
                return new UserEvent(RIGHT, status, roomName);
            case config.KEY_FIRE:
                return new UserEvent(FIRE, status, roomName);
            default: return {};
        }
    }

    static getAngleByDirection(direction) {
        const { UP, DOWN, LEFT, RIGHT } = constants.DIRECTIONS;

        switch (direction.name) {
            case UP.name:
                return 0;
            case DOWN.name:
                return Math.PI;
            case LEFT.name:
                return -Math.PI / 2;
            case RIGHT.name:
                return Math.PI / 2;
        }
    }

    static createRoomElementsByJSON(roomsJson, roomJoinHandler) {
        const rooms = [];

        roomsJson.forEach(room => {
            const roomElement = document.createElement('div');
            const roomName = document.createElement('span');
            const roomJoinButton = document.createElement('button');
            const roomPlayers = document.createElement('span');

            roomElement.classList.add('room');
            roomElement.dataset.roomName = room.name;
            roomName.classList.add('room__name');
            roomName.textContent = room.name;
            roomJoinButton.classList.add('room__join-button');
            roomJoinButton.textContent = 'Join';
            roomJoinButton.addEventListener('click', async () => {
                await roomJoinHandler(room.name);
            });
            roomPlayers.classList.add('room__players');
            roomPlayers.textContent = 'Players: 0';
            roomElement.appendChild(roomName);
            roomElement.appendChild(roomPlayers);
            roomElement.appendChild(roomJoinButton);
            rooms.push(roomElement);
        });

        return rooms;
    }
}