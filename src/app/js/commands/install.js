import {Terminal} from "../main";

export default {
  shortopts: 'l',
  handler:  async (paramsObj, cmdSet, $terminal, {restParams}) => {
    const cmdName = paramsObj.l ? '' : restParams;
    if(paramsObj.l) {
      const {default: commandsInStore} = await import('../cmd-store');
      const cmdNames = commandsInStore.map(({name}) => name);
      return '可安装的命令：\n\n' + cmdNames.join('\n -');
    }

    if(!paramsObj.l && !cmdName) {
      const {default: commands} = await import('../commands');
      Terminal.addCommands(commands);
      return Promise.resolve('成功安装命令，可输入 help 查看');
    }else if(cmdName) {
      const {default: command} = await import('../cmd-store/' + cmdName);
      Terminal.addCommands({
        [cmdName]: command
      });
      return cmdName + ' 已经成功安装';
    }
  }
};

