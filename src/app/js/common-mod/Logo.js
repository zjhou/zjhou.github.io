export default function ($wrapperEle, opt) {
    let OPTION = Object.assign({
        backgroundColor: '#fff',
        width: 100,
        height: 100,
        logoSize: 3,
        color: '#000'
    }, opt);

    if(!validOpt(OPTION)){
        throw 'Invalid option';
    }

    let ctx = init(OPTION.width, OPTION.height);

    function validOpt(opt) {
        return Number.isInteger(opt.width) &&
            Number.isInteger(opt.height) &&
            Number.isInteger(opt.logoSize);
    }
    function init(canvasWid, canvasHt) {
        let canvas = $wrapperEle.appendChild(document.createElement("canvas"));
        let ctx = canvas.getContext("2d");
        ctx.canvas.width = canvasWid || 512;
        ctx.canvas.height = canvasHt || 512;
        ctx.canvas.style.background = OPTION.backgroundColor|| 512;
        return ctx;
    }
    function Fib(n) {
        return n < 2 ? n : (Fib(n - 1) + Fib(n - 2));
    }

    function Logo(x, y, n, color) {
        if (n === 0)
            return;

        const smRectHt = Fib(n + 0)
            , smRectWd = Fib(n + 1)
            , lgRectHt = Fib(n + 2)
            , lgRectWd = Fib(n + 3)
            , logoHt   = Fib(n + 4);

        ctx.fillStyle = color || 'black';
        ctx.fillRect(x, y, smRectWd, smRectHt);
        ctx.fillRect(x + smRectWd + smRectHt, y, smRectWd, smRectHt);
        ctx.fillRect(x, y + 2 * smRectHt, smRectWd, smRectHt);
        ctx.fillRect(x + smRectWd + smRectHt, y + 2 * smRectHt, smRectWd, smRectHt);
        ctx.fillRect(x, y + logoHt - lgRectHt, lgRectWd, lgRectHt);
    }

    Logo(
         Math.floor((OPTION.width- Fib(OPTION.logoSize + 3)) / 2),
         Math.floor((OPTION.height - Fib(OPTION.logoSize + 3)) / 2),
         OPTION.logoSize,
         OPTION.color
    )
}