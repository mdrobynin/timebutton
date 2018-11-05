import { Helpers } from "../utils/helpers";
import { config } from '../config/config';

export class PlayerView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
        this.img = new Image();
        this.img.src = '../../assets/tank.jpg';
    }

    render() {
        const { x, y } = this.state.coordinates;
        const width = config.PLAYER_SIZE;
        const height = config.PLAYER_SIZE;
        const angle = Helpers.getAngleByDirection(this.state.direction);

        this.context.translate(x, y);
        this.context.rotate(angle);
        this.context.drawImage(this.img, -width / 2, -height / 2, width, height);
        this.context.rotate(-angle);
        this.context.translate(-x, -y);
    }
}
