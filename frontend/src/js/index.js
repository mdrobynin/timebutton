import { Initializer } from './utils/initializer';

const initializer = new Initializer();

window.onload = () => {
    initializer.getConfig().then(() => {
        initializer.join();
    })
};
