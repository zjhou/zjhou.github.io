import ReactDom from 'react-dom';
import intl from 'react-intl-universal';
import React from 'react';
import {CommandList} from '../../Command/Command';
import genTree from '../../../common-mod/genAsciiDirTree';
import {arch} from '../../../common-mod/Utils';
import * as BlogApi from '../../../common-mod/BlogAPI';
const lsHandler = (terminal, params) => {
    let keyWords;
    if (terminal.cmdName === 'search') {
        keyWords = params.join(' ');
    }
    else if (terminal.cmdName === 'ls') {
        let validParams = paramArr => paramArr.length === 0 ||
        (paramArr.length === 1 && paramArr.includes('-t'));
        if (!validParams(params)) {
            terminal.output('Usage: ls [-t]');
            terminal.next();
            return;
        }
    }

    let show = (result) => {
        if (result.length < 1) {
            terminal.output(intl.get('error.emptyResult'));
            terminal.next();
            return false;
        }
        let hasTreeOpt = terminal.cmdName === 'ls' && params.includes('-t');
        if (hasTreeOpt) {
            terminal.output(
                genTree(arch(result, 'posts'), {
                    LF: (leafName) =>
                        (`<span class="command" style="background: #ccfde5; border: none" data-cmd="cat ${leafName}">${leafName}</span>`)
                }),
                'append',
                'dirTree'
            );
            terminal.next();
            return;
        }
        ReactDom.render(
            <CommandList
                commands={result.map(result => ({
                    cmd: `cat ${result.title}`,
                    cmdName: result.title,
                    className: result.type
                }))}
            />, terminal.output());
        terminal.next();
    };

    terminal.loading(true);
    BlogApi
        .getAllContent(keyWords)
        .then(data => {
            terminal.loading(false);
            show(data);
        })
        .catch(err => {
            terminal.loading(false);
            terminal.output(`<span style="color: red">${intl.get('error.unknown')}</span>`);
            console.warn(err);
            terminal.next();
        });
};

const lsDoc = `
    NAME:
        ls - list all posts' name
    
    SYNOPSIS:
        ls [-t]
        
    DESCRIPTION:
        -t list posts' name based on date structure`;

export default {
    doc: lsDoc,
    handler: lsHandler
};
