import React from 'react';
import init from './handlers/init';

import PseudoTerminal from '../../3rd-lib/pseudoterminal.umd';

import './style.scss';
import {isMobile} from '../../common-mod/Utils';
import Type from '../../common-mod/Type';

export default class Terminal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initTerminal();
    }

    initTerminal() {
        window.terminal = PseudoTerminal('terminal', {
            bgColor: 'unset',
            fontFamily: `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace`,
            color: '#000',
            fontSize: 12,
            width: '100%',
            height: '100%',
            readOnly: isMobile(),
            autoFocus: !isMobile(),
            showScrollbar: isMobile(),
            inputSelectionColor: '#ceffe5',
            promptSign: '$'
        });


        terminal.addCommand('init', init);
        Type.input('init', str => terminal.currentInput = str, 80).then(() =>{
            window.terminal.execCommand('init');
        });

        terminal.oninput = function (val) {
            let inputs = val.split(/\s+/);
            if(inputs.length === 1) {
                terminal.candidates = terminal.commands;
            }else if(
                inputs.length === 2 &&
                inputs[0] === "cat" && cache.results
            ){
                let getTitles = result => {
                    return result.map(c => c.data.title[0].text)
                };
                try {
                    terminal.candidates = getTitles(cache.results)
                } catch (e) {
                    console.log('error');
                }
            }
        };

    }

    render() {
        return (
            <div style={{
                padding: 5,
                height: 'calc(100% - 10px)'
            }}>
                <div id="terminal"/>
            </div>
        );
    }
}
