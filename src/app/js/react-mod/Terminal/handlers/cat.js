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

    let handleData = (data) => {
        if (
            ['blog_post', 'rich_text_post', 'love_letter'].includes(data.type)
        ) {
            return Promise.resolve([data]);
        }
        else if (data.type === 'image') {
            return getImage(data.url)
                .then(ele => {
                    return Promise.resolve([data, ele]);
                }).catch(() => {
                    throw 'Failed to get image';
                });
        }
    };

    let showData = (data) => {
        terminal.loading(false);
        if (
            ['blog_post',  'love_letter'].includes(data[0].type)
        ) {
            terminal.output('', '', 'markdown-body').innerHTML = Converter.makeHtml(data[0].content);
        }
        else if(data[0].type === 'rich_text_post') {
            ReactDom.render(
                RichText.render(data[0].content),
                terminal.output('', '', 'markdown-body')
            );
        }
        else if (data[0].type === 'image') {
            terminal
                .output(Tpl.imageT(data[0]), 'overwrite')
                .appendChild(data[1]);
        }
        terminal.next();
    };

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
        .then(data => {
            return handleData(data[0]);
        })
        .then(showData)
        .catch(err => {
            terminal.loading(false);
            if (typeof err === 'string') {
                terminal.output(err);
            }
            else {
                terminal.output(intl.get('error.unknown'));
            }
            console.error(err);
            terminal.next();
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
