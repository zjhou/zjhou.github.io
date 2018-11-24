import PseudoTerminal from 'pseudoterminal';
import {$} from '../utils';
import install from '../commands/install';

const Terminal = PseudoTerminal($('#app'));


const init = async () => {
  document.addEventListener('click', function (evt) {
    let isCommand = Array.from(evt.target.classList).includes('command');
    let command = evt.target.getAttribute('data-cmd');
    if(isCommand && command){
      Terminal.humanizerExec(command);
    }
  });


  Terminal.addCommands({install});
  Terminal.humanizerExecCmdArr([
    'install font',
    'font',
    'install'
  ]);
};

init().then();
export {Terminal};
