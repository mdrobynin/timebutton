import { config } from '../config/config';

export class TransportService {
    static async getConfig() {
        return await fetch(config.configUrl);
    }

    static async getConstants() {
        return await fetch(config.constantsUrl);
    }

    static async getRooms() {
        return await fetch(config.roomsUrl);
    }

    static async addRoom() {
        return await fetch(config.roomsUrl, { method: 'POST' });
    }
}
