import {store} from '../utils';
import {getPostById} from '../api';

export default async function (paramObj, cmdSet, $terminal, {restParams: postName}) {
    const postId = store.get(postName.trim());
    if(!postId) {
        return '';
    }

    const { content } = await getPostById(postId);
    return content;
}
