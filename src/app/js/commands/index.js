import about from './about';
import {getPost as ls} from '../api';
import {MOON_URL} from '../constants/strVar';
import {goto} from '../utils';

const commands = {
    about,
    moon: () => {
        goto(MOON_URL);
    },
    ls
};

export default commands;