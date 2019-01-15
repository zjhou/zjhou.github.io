import {$} from '../utils';
import 'pseudoterminal';
import install from '../basic-cmd/install';

const Terminal = window.PseudoTerminal($('#app'));

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
    'install',
    'install gui',
    'gui',
  ]);
};

init().then();
export {Terminal};
