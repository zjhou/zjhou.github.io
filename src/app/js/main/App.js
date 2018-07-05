import React from 'react';
import Terminal from '../react-mod/Terminal/Terminal';
import {DB, determineLocale} from '../common-mod/Utils';
import intl from 'react-intl-universal';
import en from '../../locales/en-US';
import zh from '../../locales/zh-CN';
import './style.scss';
import {CommandList} from '../react-mod/Command/Command';

const SUPPORTED_LOCALES = ['en-US', 'zh-CN']
    , LOCALES = {'en-US': en, 'zh-CN': zh};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localesLoaded: false
        };
        this.loadLocals = this.loadLocals.bind(this);
    }

    componentDidMount() {
        DB.empty();
        this.loadLocals();
    }

    loadLocals() {
        let self = this;
        let currentLocals = determineLocale();
        if (!SUPPORTED_LOCALES.includes(currentLocals)) {
            currentLocals = 'en-US';
        }
        intl.init({
            currentLocale: currentLocals,
            locales: {
                [currentLocals]: LOCALES[currentLocals]
            },
        })
            .then(() => {
            })
            .catch(() => {
                console.warn('failed to load locale');
            });

        self.setState({
            localesLoaded: true,
            lang: currentLocals
        });
    }

    render() {
        return this.state.localesLoaded &&
             <div data-lang={this.state.lang}>
                 <svg width="8" height="13" id="logo">
                     <path d="M 0 0 L 3 0 L 3 2 L 0 2 L 0 0 M 5 0 L 8 0 L 8 2 L 5 2 L 5 0 M 0 4 L 3 4 L 3 6 L 0 6 L 0 4 M 5 4 L 8 4 L 8 6 L 5 6 L 5 4 M 0 8 L 8 8 L 8 13 L 0 13 L 0 8 Z "/>
                 </svg>
                 <div className="terminal-cont">
                     <Terminal/>
                 </div>
                 <CommandList
                     commands={[
                         {
                             cmd: 'ls -t',
                             cmdName: intl.get('nav.posts').d('post')
                         },
                         {
                             cmd: 'about',
                             cmdName: intl.get('nav.about').d('about')
                         },
                         {
                             cmd: 'clear',
                             cmdName: intl.get('nav.clear').d('clear')
                         },
                         {
                             cmd: 'help',
                             cmdName: intl.get('nav.help').d('help')
                         }
                     ]}
                 />
                 <span id="copyright">&copy; zjh, {(new Date()).getFullYear()}</span>
             </div>;
    }
}
