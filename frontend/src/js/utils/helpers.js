export class Helpers {

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
