import intl from 'react-intl-universal';
import React from 'react';

import cat from './handlers/cat';
import ama from './handlers/ama';
import ls from './handlers/ls';
import logo from './handlers/logo';

export default {
    'about': {
        handler: function (terminal) {
            terminal.output(`${intl.get('commands.intro')}`);
            terminal.next();
        }
    },
    'ama': {
        usage: ama.doc,
        handler: ama.handler
    },
    'ls': {
        usage: ls.doc,
        handler: ls.handler,
    },
    'search': {
        usage: "Usage: search &lt;keywords&gt;",
        handler: function (terminal, params) {
            if (params.length < 1) {
                terminal.output(`Usage: search &lt;keywords&gt;`);
                terminal.next();
            }
            else {
                ls.handler(terminal, params);
            }
        }
    },
    'cat': {
        usage: cat.doc,
        handler: cat.handler
    },
    'random': {handler: cat.handler},
    'logo': {
        handler: logo.handler,
        usage: logo.doc,
        shortopts: logo.shortopts
    },
};