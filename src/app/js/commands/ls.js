import {getPostNew} from '../api';
import {title} from '../../tpl/post';
import {store} from '../utils';

export default async function () {
    const posts = await getPostNew();
    posts.forEach(({title, _id}) => {
        store.set(title, _id);
    });
    return posts.map(title).join(' ');
}