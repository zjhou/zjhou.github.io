import {getImage} from '../../../common-mod/Utils';
import showdown from 'showdown';
import * as Tpl from '../../../common-mod/Template';
import * as BlogApi from '../../../common-mod/BlogAPI';
import '../markdown.css';
import intl from 'react-intl-universal';
import ReactDom from 'react-dom';
import {RichText} from 'prismic-reactjs';

const Converter = new showdown.Converter();
Converter.setFlavor('github');
const showPost = async (terminal, post) => {
    terminal.loading(false);
    switch (post.type) {
    case 'blog_post':
        terminal
            .output('', '', 'markdown-body')
            .innerHTML = Converter.makeHtml(post.content);

        terminal.next();
        break;
    case 'love_letter':
        terminal
            .output('', '', 'markdown-body')
            .innerHTML = Converter.makeHtml(post.content);
        terminal.next();
        break;
    case 'rich_text_post':
        ReactDom.render(
            RichText.render(post.content),
            terminal.output('', '', 'markdown-body')
            terminal.next();
        );
        break;
    case 'image':
        terminal.loading(true);
        getImage(post.url)
            .then(img => {
                terminal.output(Tpl.imageT(post), 'overwrite')
                    .appendChild(img);
                terminal.loading(false);
                terminal.next();
            });
        break;
    default: terminal.next();
    }
};

const catHandler = (terminal, params) => {
    if (!params[0]) {
        if (window.cache.titles.length && terminal.cmdName === 'random') {
            params[0] = window.cache.titles.randEle();
        }
        else {
            terminal.next();
            return;
        }
    }

    let filt = data => params =>
        data.filter(content => content.title === params[0])[0];

    terminal.loading(true);
    BlogApi
        .getAllContent()
        .then(data => {
            let target = filt(data)(params);
            if (!target) {
                return Promise.reject('404');
            }
            return Promise.resolve(target);
        })
        .then(data => {
            return BlogApi.getContent(data);
        })
        .then((posts) => showPost(terminal, posts[0]))
        .catch(err => {
            terminal.loading(false);
            if (typeof err === 'string') {
                throw err;
            }
            else {
                throw intl.get('error.unknown');
            }
        });
};

const catDoc = `
    NAME: 
        cat - print post content
    
    SYNOPSIS: 
        cat &lt;post name&gt;`;

export default {
    doc: catDoc,
    handler: catHandler
};
