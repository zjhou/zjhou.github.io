import {execCmdRemote} from '../api/index';
import {docTpl} from '../utils/index';

const docDesc =
    `rexe 能远程执行命令，目前只只支持 ls, cat；如：
        rexe ls
        rexe cat <file name>`

const doc = docTpl('rexe - Run command at remote machine', 'rexe [command]', docDesc);
export default {
    handler: async (a, b, c, {restParams}) =>{
        const {result, error} = await execCmdRemote(restParams);
        return error || result;
    },
    doc
}
