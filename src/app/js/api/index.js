import {graphQlQuery, req} from '../utils/requtils';
import {apiEndPoint, api} from './constants';
import {format} from '../utils';

const getPost = async () => {
    let {data} = await graphQlQuery(apiEndPoint, '{posts}');
    return data.posts;
};

const getPostNew = () => {
    return req(api.posts, 'GET');
};

const getPostById = (id) => {
    return req(format(api.post, id), 'GET');
};

const getPostTitles = async () => {
    const posts = await getPostNew();
    return posts.map(({title}) => title).join(' ');
};

export {getPost, getPostNew, getPostTitles, getPostById};