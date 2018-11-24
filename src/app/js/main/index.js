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

  await Terminal.addCommands({install});
  await Terminal.humanizerExecCmdArr([
    'install font',
    'font',
    'install',
    'clear'
  ]);
};

init().then();
export {Terminal};
