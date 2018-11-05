import { config } from '../config/config';
import { constants } from "../config/constants";

export class TerrainView {
    constructor(state, context, imageSource) {
        this.state = state;
        this.context = context;
        this.imageSource = imageSource;
        this.width = config.CANVAS_SIZE / config.BLOCKS_COUNT;
    }

    render() {
        let { x, y } = this.state.coordinates;
        const { GRASS, STONE, WALL } = constants.TERRAIN_TYPES;
        const { grassImg, stoneImg, wallImg } = this.imageSource;
        const width = this.width;

        x += width / 2;
        y += width / 2;
        this.context.translate(x, y);
        switch (this.state.type) {
            case GRASS:
                this.context.drawImage(grassImg, -width / 2, -width / 2, width, width);
                break;
            case STONE:
                this.context.drawImage(stoneImg, -width / 2, -width / 2, width, width);
                break;
            case WALL:
                this.context.drawImage(wallImg, -width / 2, -width / 2, width, width);
                break;
        }
        this.context.translate(-x, -y);
    }
}
