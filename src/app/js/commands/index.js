import about from './about';
import {getPost} from '../api';

const commands = {
    about,
    ls: () => getPost()
};

export default commands;