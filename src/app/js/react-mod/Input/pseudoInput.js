import Util from '../PseudoTerminal/util';
function PseudoInput(wrapperId, option) {
    function getWrapper(wrapperId) {
        return document.getElementById(wrapperId) || false;
    }

    function initRealInput(wrapperId) {
        let existOne = document.getElementById('mapWith' + wrapperId);
        if (existOne) {
            return existOne;
        }

        let $RealInput = document.createElement('input');

        $RealInput.style.height = '20px';
        $RealInput.style.position = 'fixed';
        $RealInput.style.outline = 'none';
        $RealInput.style.border= 'none';
        $RealInput.style.opacity= 0;
        $RealInput.setAttribute('autocomplete', 'off');
        // $RealInput.style.bottom= '-50px';
        $RealInput.id = 'mapWith' + wrapperId;
        if(option.readOnly) {
            $RealInput.setAttribute('readonly', true);
            $RealInput.onfocus=function () {
                $RealInput.blur();
            };
        }
        if(option.autoFocus) {
            $RealInput.onblur=function () {
                $RealInput.focus();
            };

        }
        return document.body.appendChild($RealInput);
    }

    function charT(char, type = 'char') {
        let isWhiteSpace = char === ' ',
            isCursor = type === 'cursor',
            blink = isCursor && $realInput.selectionStart === $realInput.selectionEnd && option.blink,
            opacityColor = 'rgba(0,0,0,0)',
            color, bgColor;

        if(isCursor) {
            if($realInput.selectionStart !== $realInput.selectionEnd){
                bgColor = option.selectionColor;
            }else{
                bgColor = option.cursorColor;
            }
        }else{
            bgColor = 'unset';
        }

        if (isCursor) {
            if (isWhiteSpace) {
                color = opacityColor;
            }
            else {
                color = option.backgroundColor === 'unset' ? '#000' : option.backgroundColor;
            }
        }
        else {
            if (isWhiteSpace) {
                color = opacityColor;
            }
            else {
                color = option.color;
            }
        }

        return `<span class="${type} ${blink && 'blink'}" style="color: ${color}; background: ${bgColor}" >${isWhiteSpace ? '&nbsp;' : char}</span>`;
    }

    function update($wrapper, $realInput, valueChanged) {
        userInput = $realInput.value.split('');
        let isCursor = (idx) => idx >= $realInput.selectionStart && idx <= $realInput.selectionEnd
            , isSpaceCursor = $realInput.selectionStart === userInput.length
            , blink = isSpaceCursor && $realInput.selectionStart === $realInput.selectionEnd && option.blink
            , spaceBgColor = isSpaceCursor ? option.cursorColor : 'unset'
            , spaceColor = 'rgba(0,0,0,0)'
            , space = `<span class="${blink && 'blink'}" style="color: ${spaceColor}; background: ${blink ? spaceBgColor : 'unset'}">&nbsp;</span>`;

        typedUserInput = userInput.map((ch, idx) => [ch, isCursor(idx) ? 'cursor' : 'char']);
        $wrapper.innerHTML = typedUserInput.map(input => charT(...input)).join('') + space;
    }

    function onCursorMove($realInput, cb) {
        $realInput.onkeyup = (evt) => {
            const move = ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(evt.code)
                , selectAll = evt.ctrlKey && evt.code === 'KeyA'
                , enter = evt.code === 'Enter';
            if (move || selectAll) {
                cb && cb(evt);
            }

            if (enter) {
                option.onEnter && option.onEnter($realInput.value);
            }
        };
    }

    function beautify($wrapper) {
        $wrapper.style.fontFamily = option.fontFamily;
        $wrapper.style.fontSize = option.fontSize || '16px';
        $wrapper.style.backgroundColor = option.backgroundColor || '#fff';
        $wrapper.style.color = option.color || '#000';

    }
    
    function moveCursorTo(index) {
        $realInput.selectionStart = $realInput.selectionEnd = index;
        focus();
        update($wrapper, $realInput);
    }

    function ifCharClicked(doSth) {
        $wrapper.addEventListener('click', evt => {
            doSth(Array.from($wrapper.children).indexOf(evt.target), evt.target);
        });
    }

    function completion(currentInput) {
        if(!CAND){
            return currentInput;
        }
        let ref = currentInput.split(/\s+/).pop();
        let result = CAND.filter(s => s.startsWith(ref));
        if(result.length !== 1) return currentInput;
        else{
            return currentInput.replace(new RegExp(ref + '$'), result[0]);
        }
    }

    function init(wrapperId, useOldInput) {
        option = Object.assign({
            color: '#000',
            backgroundColor: '#fff',
            cursorColor: '#000',
            fontSize: '16px',
            fontFamily: 'monospace',
            selectionColor: 'blue',
            readOnly: false,
            autoFocus: false,
            blink: true,
        }, option);
        $wrapper = getWrapper(wrapperId);
        if (!useOldInput) {
            $realInput = initRealInput(wrapperId);
        }
        $realInput.value = '';
        userInput = [];
        typedUserInput = [];

        updateRealIptPos(wrapperId);
        beautify($wrapper);
        update($wrapper, $realInput);
        onCursorMove($realInput, () => update($wrapper, $realInput));
        ifCharClicked((there) => moveCursorTo(there));
        $realInput.oninput = (evt) => {
            if (option.onChange) {
                option.onChange(evt.target.value);
            }
            update($wrapper, evt.target);
        };
        $realInput.addEventListener('keydown', function (evt) {
            if(evt.code === 'Tab') {
                evt.preventDefault();
                $realInput.value = completion($realInput.value);
                update($wrapper, $realInput);
            }
        }, false);
        $realInput.focus();
        if (!option.disableAutoFocus) {
            $realInput.onblur = $realInput.focus;
        }
    }

    function blur() {
        $realInput.blur();
        $wrapper.innerHTML = userInput.join('');
    }

    function focus() {
        $realInput.focus();
        //update($wrapper, $realInput);
    }

    let $wrapper, $realInput, userInput, typedUserInput, CAND; 

    init(wrapperId);
    Util.injectCSS(`
            @keyframes blink {
              from {
                 background: ${option.cursorColor || '#fff'};
                 color: ${option.backgroundColor};
              }

              to {
                 background: none;
                 color: ${option.color};
              }
            }
            
            .blink {
              animation-duration: 1s;
              animation-name: blink;
              animation-iteration-count: infinite
            }
        `);
    function updateRealIptPos(wrapperId) {
        let wrapperReact = document.getElementById(wrapperId).getBoundingClientRect();
        $realInput.style.top = wrapperReact.y;
        $realInput.style.left = wrapperReact.x;
    }

    return {
        get value() {
            return $realInput.value;
        },
        set value(val) {
            $realInput.value = val;
            update($wrapper, $realInput);
        },
        set blink(val) {
            option.blink = val;
            update($wrapper, $realInput);
        },
        set candidates(cand) {
            if(!Array.isArray(cand)) return false;
            else {
                CAND = cand;
            }
        },
        set disabled(disable) {
            if(disable){
                $realInput.setAttribute('disabled', true);
            }else{
                $realInput.removeAttribute('disabled');
            }
        },
        set onEnter(onEnter) {
            if (typeof onEnter === 'function') {
                option.onEnter = onEnter;
            }
        },
        set onChange(onChange) {
            if (typeof onChange === 'function') {
                option.onChange = onChange;
            }
        },
        blur: blur,
        focus: focus,
        destroy: function () {$realInput.remove();},
        focusOn: function(newWrapperId) {
            updateRealIptPos(newWrapperId);
            if (newWrapperId === wrapperId) {
                this.focus();
                update();
            }
            else {
                this.blur();
                init(newWrapperId, true);
            }
        }
    };
}

export default PseudoInput;
