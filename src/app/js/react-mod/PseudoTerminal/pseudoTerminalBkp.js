import PseudoInput from './pseudoinput';
import getOpt from './getOpt';
import Util from './util';

const Trim = Util.Trim
    , injectCSS = Util.injectCSS
    , createNodesFrom = Util.createNodesFrom;

function PseudoTerminal(wrapperId, option = {}) {
    function createTerminal(wrapperId) {
        let existOne = document.getElementById('under_' + wrapperId);
        if (existOne) {
            return existOne;
        }
        else {
            let terminal = document.createElement('div'),
                $wrapper = document.getElementById(wrapperId);
            terminal.id = 'under_' + wrapperId;
            return $wrapper.appendChild(terminal);
        }
    }

    function sessionData(input, output) {
        this.input = input;
        this.output = output;
        return this;
    }

    function sessionT(sessionData, index) {
        return `
            <div class="session">
                <div class="input">
                    <span class="prompt">${option.promptSign}</span>
                    <span class="cmd" id="cmd_${index || Math.random()}">
                        ${sessionData.input || ''}
                    </span>
                </div>
                <div class="output">
                    <pre>${sessionData.output || ''}</pre>
                </div>
            </div>`;
    }

    function addEmptySession($terminal, sessionT) {
        let $session = createNodesFrom(sessionT)[1];
        return $terminal.appendChild($session);
    }

    function getSessionInputId($session) {
        return $session.getElementsByClassName('cmd')[0];
    }

    function initNewSession($terminal) {
        let hasSession = $terminal.childNodes.length > 0;
        if (hasSession) {return false;}

        let $emptySession = addEmptySession($terminal, sessionT(new sessionData()));
        let emptySessionInputId = getSessionInputId($emptySession).id;

        Input = PseudoInput(emptySessionInputId, {
            color: option.color,
            backgroundColor: 'unset',
            fontFamily: option.fontFamily,
            fontSize: option.fontSize,
            readOnly: option.readOnly,
            cursorColor: option.cursorColor || option.color,
            selectionColor: option.inputSelectionColor,
            disableAutoFocus: true,
        });
        Input.onEnter = (val) => {
            Input.blur();
            exec(val);
        };
    }

    function moveHistIdx(dir) {
        Input.focus();
        if(HistIdx < 0) return;
        switch (dir) {
        case 'forwards':
            HistIdx < History.length - 1 ? HistIdx = HistIdx + 1 : false;
            break;

        case 'backwards':
            HistIdx > 0 ? HistIdx = HistIdx - 1 : false;
            break;
        }
        return HistIdx;
    }

    function output(result, mode, ...classList) {
        let $showArea = $terminal.lastChild.querySelector('.output'),
            $textArea = $showArea.lastElementChild;

        $showArea.classList.add(...classList);

        switch (mode) {
        case 'append':
            $textArea.insertAdjacentHTML('afterend',`<pre>${Trim(result)}</pre>`);
            return $showArea.lastElementChild;
        case 'overwrite':
            $showArea.innerHTML = result;
            return $showArea;
        default: $textArea.innerHTML = Trim(result);
        }

        return $showArea;
    }

    function focusOnNewSession(Input) {
        Input.blink = true;
        Input.disabled = false;
        let $newSession = addEmptySession($terminal, sessionT(new sessionData()));
        let newSessionId = getSessionInputId($newSession).id;
        Input.focusOn(newSessionId);
        autoScroll($terminal);
        STATUS = 'AVAILABLE';
    }

    function exec(userInput = '') {
        STATUS = 'BUSY';
        if (userInput) {
            History.push(userInput);
            HistIdx = History.length - 1;
        }

        let inputArr = userInput.trim().split(/\s+/),
            cmdName = inputArr[0],
            params = inputArr.slice(1);

        if (!cmdName) {
            focusOnNewSession(Input);
            return;
        }
        let execHistReg = /!(\d+)/,
            histMatches= cmdName.match(execHistReg);
        if(histMatches){
            let histCmd = History[Number(histMatches[1]) - 1];
            exec(histCmd, ...histCmd.split(/\s+/));
            return;
        }
        let validCmdNames = Object.keys(Commands);
        if (!validCmdNames.includes(cmdName)) {
            output(`
                Command not found. input 'help' for more information.`);
            focusOnNewSession(Input);
        }
        else {
            let handler = Commands[cmdName].handler || Commands[cmdName],
                shortopts = Commands[cmdName].shortopts,
                usage = (Commands[cmdName].usage || '').replace(/</g, '&lt;'),
                util = {
                    cmdName: cmdName,
                    output: output,
                    next: () => focusOnNewSession(Input),
                    loading: Util.loadingText(output)};

            if (shortopts) {
                try {
                    return handler(util, getOpt(shortopts, params));
                }
                catch (e) {
                    output(`${e}${usage ? '\n\n' : ''}`);
                    output(usage ? usage : '', 'append');
                    util.next();
                }
            }
            else {
                return handler(util, params);
            }
        }

    }

    function autoScroll($terminal) {
        let $wrapper = document.querySelector('#' + wrapperId);
        if(option.showScrollbar) {
            $wrapper.scrollTop = $wrapper.scrollHeight - $wrapper.clientHeight;
            return;
        }
        let ht = $wrapper.offsetHeight;
        let exceedLen = $terminal.offsetHeight - ht;
        if (exceedLen < 0) {
            $terminal.style.top = 0;
        }
        else {
            $terminal.style.top = `${-1 * exceedLen}px`;
        }
    }

    function scrollTo(top) {
        $terminal.style.top = top + 'px';
    }

    function scroll(direct, step = 50) {
        // let ht = Number(option.height.match(/\d+/)[0]);
        let ht = document.querySelector('#' + wrapperId).offsetHeight;
        let exceedLen = $terminal.offsetHeight - ht;
        if (exceedLen < 0) return false;
        let range = [-1 * exceedLen, 0],
            topNow = Number($terminal.style.top.replace('px', ''));

        if (topNow < range[0]) {
            scrollTo(range[0]);
            return true;
        }

        if (topNow > range[1]) {
            scrollTo(range[1]);
            return true;
        }

        switch (direct) {
        case 'up':
            if(topNow !== range[1]){
                scrollTo(topNow + step);
            }
            break;
        case 'down':
            if(topNow !== range[0]) {
                scrollTo(topNow - step);
            }
            break;
        }
    }

    function beautify($terminal) {
        let tid = $terminal.id;
        injectCSS(`
            #${wrapperId} {
                position: relative;
                width: ${option.width};
                height: ${option.height};
                background: ${option.bgColor};
                color: ${option.color};
                overflow: hidden;
                overflow-y: ${option.showScrollbar ? 'auto' : 'hidden'};
            }
            #${tid} {
                position: ${option.showScrollbar ? 'unset' : 'absolute'};
                top: 0;
                transition: all .2s;
                width: 100%;
                word-wrap: break-word;
                font-family: ${option.fontFamily};
                font-size: ${option.fontSize};
            }
            
            .session {
                margin-bottom: 10px;
            }
            
            .output {padding: 5px 0}
            
            .output > pre {
                margin: 0;
                line-height: 1.2;
                font-family: ${option.fontFamily};
            }
        `);
        return $terminal;
    }

    function ifWheelScrollTo(handler) {
        let $wrapper = document.querySelector('#' + wrapperId);
        $wrapper.addEventListener('wheel', function (event) {
            let dir = event.deltaY > 0 ? 'down' : 'up';
            handler(dir, Math.abs(event.deltaY));
        }, {passive: true});
        return $terminal;
    }

    function ifKeyPress(handleKeyPress) {
        document.addEventListener('keydown', evt => {
            Input.focus();
            autoScroll($terminal);
        });
        document.addEventListener('keyup', evt => {
            let handler = handleKeyPress[evt.code];
            if(handler && typeof handler === 'function') {
                handler(evt);
            }
        });
    }

    function init($terminal) {
        option = Object.assign({
            showScrollbar: false,
            width: '700px',
            height: '300px',
            bgColor: '#fff',
            color: '#000',
            promptSign: '$',
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
            inputSelectionColor: 'blue',
            fontSize: '12px',
            readOnly: false,
            autoFocus: false,
        }, option);
        if(!option.showScrollbar){
            ifWheelScrollTo(scroll);
        }
        initNewSession($terminal);
        let handleKeyPress = {
            ArrowUp: () => {
                Input.value = History[moveHistIdx('backwards')]||'';
            },
            ArrowDown: () => {
                Input.value = History[moveHistIdx('forwards')]||'';
            }
        };
        ifKeyPress(handleKeyPress);
        return $terminal;
    }

    // internal commands
    function clear(utils) {
        while ($terminal.firstChild) {
            $terminal.removeChild($terminal.firstChild);
        }
        utils.next();
    }

    function help(utils) {
        let userCmds = Object.entries(Commands)
                .filter(entry => entry[1].type === 'addByUser')
                .map(entry => entry[0]).join('\n'),
            githubAddr = 'https://github.com/zjhou/pseudoTerminal';
        utils.output(`
            <a href="${githubAddr}">PseudoTerminal</a>, Version 0.0.1 (c) zjhou. These commands are defined internally:

            help          see this help information
            exit          destroy the terminal
            clear         clear the screen
            history       view history commands
            man           see commands' manual
            
            `);

        if(userCmds) {
            utils.output(`These commands are defined by user: \n\n${userCmds}`, 'append');
        }

        utils.next();
    }

    function man(utils, params) {
        let validParams = params => params && params.length === 1;
        let cmdName = params[0];
        if(validParams(params)){
            if(Object.keys(Commands).includes(cmdName)){
                let cmdObj = Commands[cmdName];
                if(cmdObj.type === 'addByUser'){
                    utils.output(cmdObj.usage ? cmdObj.usage : `No manual entry for "${cmdName}"`);
                    utils.next();
                }else{
                    utils.output(`No manual entry for "${cmdName}"`);
                    utils.next();
                }
            }else{
                utils.output(`No manual entry for "${cmdName}"`);
                utils.next();
            }
        }else{
            utils.output('Usage: man &lt;command&gt;');
            utils.next();
        }
    }

    function exit() {
        $terminal.remove();
        Input.destroy();
    }

    function history(utils) {
        let len = History.length;
        utils.output(
            History.map((hist, idx) =>
                `${Util.completionWith(' ')(idx + 1, len)}  ${hist}`
            ).join('\n')
        );
        utils.next();
    }


    let $terminal = beautify(init(createTerminal(wrapperId))),
        Input,
        STATUS = 'AVAILABLE',
        History = [],
        HistIdx = -1,
        Commands = {
            help: help,
            clear: clear,
            history: history,
            exit: exit,
            man: man
        };

    return {
        set candidates(val) {
            if(Array.isArray(val)) {
                Input.candidates = val;
            }
        },
        set freeze(val) {
            Input.disabled = val;
        },
        set oninput(fun) {
            if(typeof fun === 'function') {
                Input.onChange = fun;
            }
        },
        get currentInput() {
            return Input.value;
        },
        set currentInput(input) {
            if(typeof input === 'string') {
                autoScroll($terminal);
                Input.value = input;
            }
        },
        get commands() {
            return Object.entries(Commands).map(entry => entry[0]);
        },
        addCommand: function (cmdName, cmdBody) {
            let validCmd = (
                cmdName &&
                cmdBody.handler &&
                typeof cmdBody.handler === 'function'
            );

            cmdBody.type = 'addByUser';
            if (validCmd) {
                Commands[cmdName] = cmdBody;
            }
            return this;
        },
        get isAvailable() {
            return STATUS === 'AVAILABLE' && !Input.value;
        },
        execCommand: function (cmd) {
            if(STATUS === 'AVAILABLE'){
                Input.blink = false;
                Input.value = cmd;
                autoScroll($terminal);
                return exec(cmd);
            }
        },
        destroy: exit
    };
}

export default PseudoTerminal;
