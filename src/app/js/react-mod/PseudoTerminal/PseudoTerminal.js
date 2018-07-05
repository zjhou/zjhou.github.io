import React from 'react';
import Input from '../Input/Input';
import PropTypes from 'prop-types';

function SessInput(props) {
    return (
        <div className="input">
            <span className="prompt">{props.promptSign}</span>
            <span className="cmd">
                {props.isHistSess
                    ? props.input
                    : <Input value={props.input}/>
                }
            </span>
        </div>
    );
}

SessInput.propTypes = {
    promptSign: PropTypes.string,
    isHistSess: PropTypes.bool,
    input: PropTypes.string
};

function SessOutput(props) {
    return (
        <div className="output">
            <pre>{props.output}</pre>
        </div>
    );
}

SessOutput.propTypes = {
    output: PropTypes.any
};

function Session(props) {
    return (
        <div className="session">
            <SessInput
                promptSign={props.promptSign}
                isHistSess={props.isHistSess}
            />
            <SessOutput
                output={props.output || ''}
            />
        </div>
    );
}

Session.propTypes = {
    promptSign: PropTypes.string,
    isHistSess: PropTypes.bool,
    input: PropTypes.string,
    output: PropTypes.string
};

export default class PseudoTerminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionInput: []
        };
    }

    render() {
        return (
            <Session
                isHistSess={false}
                input=""
                output=""
            />
        );
    }
}