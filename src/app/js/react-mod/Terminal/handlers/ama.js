import {ama} from '../../../common-mod/StdLib';
import intl from 'react-intl-universal';
import {ErrorT} from '../../../common-mod/Template';
const amaHandler = (terminal, params) => {
    if(params.length < 1){
        terminal.output("Usage: ama　&lt;something&gt;");
        terminal.next();
        return;
    }

    terminal.loading(true);
    ama(params.join(" "))
        .then((result) => {
            terminal.loading(false);
            terminal.output(intl.get("commands.ama.success"));
            terminal.next();
        })
        .catch(e => {
            console.log(JSON.stringify(e));
            terminal.loading(false);
            terminal.output(ErrorT(intl.get("error.unknown")));
            terminal.next();
        })
};

const amaDoc = `
    NAME:
        ama - Ask Me Anything.
    
    SYNOPSIS:
        ama &lt;something&gt;`;

export default {
    doc: amaDoc,
    handler: amaHandler
}
