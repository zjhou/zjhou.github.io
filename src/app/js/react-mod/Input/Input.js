import React from 'react';
import classNames from 'classnames';
import './input.scss';
import PropTypes from 'prop-types';

const Font = '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';
const RealInputStyle = {
    height: 20,
    position: 'fixed',
    outline: 'none',
    border: 'none',
    opacity: 0
};

const PseudoInputStyle = {
    display: 'inline-block',
    fontFamily: Font,
    fontSize: 10,
};

const Cursor = () =>
    <span className="blink">&nbsp;</span>;

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
            cursorIdx: 0,
            needAppendCursor: true,
        };
        this.setValue = this.setValue.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.onCharClick = this.onCharClick.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        Input.handleKeyDown = Input.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.RealInput.focus();
    }

    setValue(e) {
        this.setState({value: e.target.value});
    }

    onCharClick(index) {
        this.RealInput.selectionStart = this.RealInput.selectionEnd = index;
        this.setState({
            cursorIdx: index,
            needAppendCursor: false
        });
    }

    onInputClick() {
        this.RealInput.focus();
    }

    static handleKeyDown(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            return false;
        }
    }

    updateInput(e) {
        const move = [' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Backspace'].includes(e.key)
            , select = e.ctrlKey && move
            , selectAll = e.ctrlKey && e.key === 'a'
            , enter = e.key === 'Enter';

        if (move || select || selectAll) {
            let selStart = this.RealInput.selectionStart,
                inputVal = this.RealInput.value,
                selEnd = this.RealInput.selectionEnd;

            this.setState({
                needAppendCursor: (
                    selStart === selEnd &&
                    selStart === inputVal.length &&
                    document.activeElement === this.RealInput
                ),
                hasSelection: selStart !== selEnd,
                cursorIdx: selStart === selEnd ? selStart : null
            });

            return true;
        }

        if (enter) {
            this.props.onEnter &&
            typeof this.props.onEnter === 'function' &&
            this.props.onEnter(this.RealInput.value);
            return true;
        }

        this.setState({cursorIdx: this.RealInput.selectionEnd});
    }

    render() {
        return (
            <div
                className="input"
                style={PseudoInputStyle}
                onClick={this.onInputClick}
            >
                {
                    this.state.value.split('').map((char, index) => {
                        if (char === ' ') {char = '&nbsp;';}
                        return (
                            <span
                                className={classNames({
                                    'blink': (
                                        index === this.state.cursorIdx &&
                                        !this.state.hasSelection &&
                                        !this.state.needAppendCursor
                                    ),
                                    'selected': (
                                        this.state.hasSelection &&
                                        index >= this.RealInput.selectionStart &&
                                        index < this.RealInput.selectionEnd
                                    )
                                })}
                                key={index}
                                onClick={() => this.onCharClick(index)}
                                dangerouslySetInnerHTML={{__html: char}}
                            />
                        );
                    })
                }
                {this.state.needAppendCursor && <Cursor/>}
                <input
                    autoComplete="off"
                    ref={realInput => this.RealInput = realInput}
                    onKeyUp={this.updateInput}
                    onKeyDown={Input.handleKeyDown}
                    onInput={this.setValue}
                    style={RealInputStyle}
                />
            </div>
        );

    }
}

Input.propTypes = {
    value: PropTypes.string,
    onEnter: PropTypes.func
};