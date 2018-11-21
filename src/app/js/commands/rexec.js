import {execCmdRemote} from '../api';
import {docTpl} from '../utils';

const docDesc =
    `rexec 能在远程容器里执行命令，目前只只支持 ls, cat；如：
        rexec ls -al
        rexec cat hello`


const doc = docTpl('rexec - Run command at remote machine', 'rexec [command]', docDesc);
export default {
    handler: async (a, b, c, {restParams}) =>{
        const {result} = await execCmdRemote(restParams);
        return result;
    },
    doc
}

