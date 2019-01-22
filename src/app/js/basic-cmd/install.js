import {Terminal} from "../main";
import {insert} from "../utils";
import {docTpl} from "../utils";

const desc =
    `install - 安装默认命令，列出命令等
        install           安装默认命令
        install -l        列出可安装的额外命令
        install <cmdName> 安装指定命令`;

const doc = docTpl('install', 'install [-l | <cmdName>]', desc);

export default {
  doc,
  shortopts: 'l',
  handler:  async (paramsObj, cmdSet, $terminal, {restParams: cmdName}) => {
    let isNoParams = !paramsObj.l && !cmdName;

    if(isNoParams) {
      const {default: commands} = await import('../basic-cmd');
      Terminal.addCommands(commands);
      return Promise.resolve('成功安装命令，可输入 help 查看');
    } else {
      const {default: commandsInStore} = await import('commands');
      const validCmds = commandsInStore.map(({name}) => name);
      if(paramsObj.l) {
        return '可安装的命令：\n' + validCmds.map(insert('- ')).join('\n');
      } else if(cmdName && validCmds.includes(cmdName.trim())) {
        try{
          const {default: command} = await import(
            /* webpackInclude: /lib.*js/ */
            /* webpackExclude: /lib.*(node_modules|src|(md|json|babelrc|gitignore|config\.js)$)/ */
            `commands/lib/${cmdName}`
            );
          Terminal.addCommands({
            [cmdName]: command
          });
        } catch (e) {
          console.warn(e);
        }
        return cmdName + ' 已经成功安装';
      }
    }

    return ''
  }
};

