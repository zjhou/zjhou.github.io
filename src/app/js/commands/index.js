import about from './about';
import ls from './ls';
import cat from './cat';
import {MOON_URL} from '../constants/strVar';
import {goto} from '../utils';

const commands = {
    about,
    moon: () => {goto(MOON_URL);},
    ls,
    cat,
};

export default commands;