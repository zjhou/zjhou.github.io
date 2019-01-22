import install from '../basic-cmd/install';
import {$} from '../utils';


const init = async () => {
  const {default: PseudoTerminal} = await import('pseudoterminal');
  const Terminal = PseudoTerminal($('#terminal'));
  window.Terminal = Terminal;

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
