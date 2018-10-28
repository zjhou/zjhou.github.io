import {graphQlQuery} from '../utils/requtils';
import {apiEndPoint} from './constants';

const getPost = async () => {
    let {data} = await graphQlQuery(apiEndPoint, '{posts}');
    return data.posts;
};

export {getPost};