import PseudoTerminal from 'pseudoterminal';
import {$} from '../utils';
const Terminal = PseudoTerminal($('#app'));
Terminal.commands = {
    install: async () => {
        const {default: commands} = await import('../commands');
        Terminal.addCommands(commands);
        return Promise.resolve('成功安装命令，可输入 help 查看');
    }
};

Terminal.humanizerExec('install');
export {Terminal};