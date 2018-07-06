import Type from '../../../common-mod/Type';
import * as BlogApi from '../../../common-mod/BlogAPI';
const initHandler =  async function (terminal, params) {
    let formatPrint = (str) =>
        `<span style="display: inline-block; background: #ccfde5">${str}</span>`;

    let forceReload = params && params.length === 1 && params[0] === '-f';
    if (forceReload) {
        delete window.cache.results;
        delete window.cache.titles;
    }

    let print = (str, speed, formatter) => {
        let wrap = terminal.output('', 'append');
        return Type.input(str, content =>
            wrap.innerHTML = formatter
                ? formatter(content)
                : content, speed);
    };


    let isOnline = navigator.onLine;
    await print(`[1/${isOnline ? '2' : '1'}] initialize commands`, 40);
    const Commands = await import('../Commands');
    for (let cmdName in Commands.default) {
        if(Commands.default.hasOwnProperty(cmdName)){
            window.terminal.addCommand(cmdName, Commands.default[cmdName]);
        }
    }

    if (window.cache.results) {
        print('Content is ready.',20, formatPrint)
            .then(terminal.next);
        return;
    }

    if(isOnline){
        await print(forceReload ? '[2/2] reloading...' : '[2/2] download posts', 30);
        let wrap = terminal.output('', 'append');
        terminal.loading(true, wrap);
        try {
            await BlogApi.getAllContent();
        }catch (e) {
            throw 'Failed to download posts.';
        }
        terminal.loading(false, wrap);
    }

    await print('Done!', 30, formatPrint);
    terminal.next();
};

const initDoc = `
    NAME: 
        init - Download posts.
        
    SYNOPSIS:
        int [-f]
        
    DESCRIPTION:
        Download all posts and cache it.
        
        -f Delete cache content and reload.`;

export default {
    doc: initDoc,
    handler: initHandler
};