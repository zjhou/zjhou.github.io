import React from 'react';
import Input from '../Input/Input';

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

function SessOutput(props) {
    return (
        <div className="output">
            <pre>{props.output}</pre>
        </div>
    );

}
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