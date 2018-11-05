import { config } from '../config/config';

export class BulletView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
    }

    render() {
        const { x, y } = this.state.coordinates;

        this.context.beginPath();
        this.context.arc(x, y, config.BULLET_SIZE, 0, 2 * Math.PI);
        this.context.fillStyle = '#FF0000';
        this.context.fill();
    }
}
