import PseudoTerminal from 'pseudoterminal';
import commands from '../commands';
import {$} from '../utils';
const Terminal = PseudoTerminal($('#app'));
Terminal.commands  = commands;
export {Terminal};