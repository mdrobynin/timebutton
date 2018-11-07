import { Starter } from './utils/starter';

const starter = new Starter();

window.onload = () => {
    starter.getConfig()
        .then(() => {
            starter.connect();
        });
};
