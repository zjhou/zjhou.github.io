import React from 'react';
import './style.scss';
import {exec} from '../../common-mod/Utils';
import PropTypes from 'prop-types';

function Command(props) {
    return <span
        className={`command ${props.className||''}`}
        onClick={() => {
            exec(window.terminal, props.cmd);
        }}
    >{props.children || props.cmdName}</span>;
}

Command.propTypes = {
    className: PropTypes.string,
    cmd: PropTypes.string,
    cmdName: PropTypes.string,
    children: PropTypes.string
};

function CommandList(props) {
    return <div className="commands">
        {props.commands.map((command, idx) =>
            <Command
                cmd={command.cmd}
                key={idx}
                className={command.className}
            >{command.cmdName}</Command>
        )}
    </div>;
}

CommandList.propTypes = {
    commands: PropTypes.arrayOf(PropTypes.shape(Command.propTypes))
};

export {Command, CommandList};