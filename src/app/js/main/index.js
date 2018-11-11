import PseudoTerminal from 'pseudoterminal';
// import commands from '../commands';
import {$} from '../utils';
const Terminal = PseudoTerminal($('#app'));
// Terminal.commands  = commands;
Terminal.commands = {
    install: async () => {
        const {default: commands} = await import('../commands');
        Terminal.addCommands(commands);
        return Promise.resolve('成功安装额外命令，可输入 help 查看全部可用命令');
    }
};
export {Terminal};