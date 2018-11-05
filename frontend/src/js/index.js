import { Initializer } from './utils/initializer';

const initializer = new Initializer();

window.onload = async () => {
    await initializer.loadRooms();
    await initializer.getConfig();
    initializer.showCurrentPlayersOnline();
};
