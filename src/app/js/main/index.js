import PseudoTerminal from 'pseudoterminal';
import commands from '../commands';
const Terminal = PseudoTerminal(document.querySelector('#terminal'));
Terminal.commands  = commands;
export {Terminal};