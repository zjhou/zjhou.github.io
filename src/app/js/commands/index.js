import about from './about';
import {getPost} from '../api';
import {MOON_URL} from '../constants/strVar';
import {goto} from '../utils';

const commands = {
    about,
    moon: () => {
        goto(MOON_URL);
    },
    ls: () => getPost()
};

export default commands;