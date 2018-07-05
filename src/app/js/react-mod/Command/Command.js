import React from 'react';
import './style.scss'
import {exec} from '../../common-mod/Utils';

function Command(props) {
    return <span
        className={`command ${props.className||""}`}
        key={props.idx || ""}
        onClick={() => {
            exec(terminal, props.cmd);
        }}
    >{props.children || props.cmdName}</span>
}

function CommandList(props) {
    return <div className="commands">
        {props.commands.map((command, idx) =>
            <Command
                cmd={command.cmd}
                key={idx}
                idx={idx}
                className={command.className}
            >{command.cmdName}</Command>
        )}
    </div>
}

export {Command, CommandList}