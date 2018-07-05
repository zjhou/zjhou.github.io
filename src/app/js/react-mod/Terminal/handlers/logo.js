import genLogo from '../../../common-mod/Logo';

const logoHandler = function (terminal, params) {
    genLogo(terminal.output(), {
        width: Number(params.w),
        height: Number(params.h),
        logoSize: Number(params.s),
        color: params.c
    });
    terminal.next();
};

const doc = `
    NAME:
        logo - generate my logo 
    
    SYNOPSIS:
        logo <-w width> <-h height> <-s size> <-c color>
        
    DESCRIPTION:
        -w logo's width
        -h logo's height
        -s logo's size (a value between 3 and 7 is recommended)
        -c logo's color
    
    EXAMPLE:
        logo -w 100 -h 100 -s 4 -c #00ac50
        logo -w 100 -h 200 -s 5 -c yellow`;

const shortopts = 'w:h:s:c:';

export default {
    handler: logoHandler,
    doc: doc,
    shortopts: shortopts
};