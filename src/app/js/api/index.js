import {req} from '../utils/requtils';
import {api} from './constants';
import {format} from '../utils';

const getPost= () => {
    return req(api.posts, 'GET');
};

const getPostById = (id) => {
    return req(format(api.post, id), 'GET');
};

const getPostTitles = async () => {
    const posts = await getPost();
    return posts.map(({title}) => title).join(' ');
};

const execCmdRemote = (cmd) => {
    return req(format(api.exec, cmd), 'GET')
}

export {getPost, getPostTitles, getPostById, execCmdRemote};
