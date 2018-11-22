import {docTpl} from '../utils';

const desc =
    `fullscreen 进入或退出全屏模式
        fullscreen    进入
        fullscreen -e 退出`
const doc = docTpl('fullscreen', 'fullscreen [-e]', desc)

export default {
    shortopts: 'e',
    handler: (paramsObj) => {
        const {e:exit} = paramsObj;
        let $body = document.body;
        $body.classList[
            exit ? 'remove' : 'add'
        ]('fullscreen');
        return ""
    },
    doc
}
