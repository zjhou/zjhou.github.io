const Trim = (str) => {
    if(!str) return "";
    let strArr = str.split('\n'),
        noStartSpace = strArr.filter(str => /^[^-\s].*/.test(str) && str !== '').length > 0;
    if (strArr.length === 1 || noStartSpace) {
        return str;
    }
    else {
        let spaceArr = strArr.map(str => str.match(/^\s+/)).filter(v => v).map(arr => arr[0]);
        let shortestSpaceLen = Math.min.apply(null, spaceArr.map(space => space.length));
        let result = strArr.map(str => str.slice(shortestSpaceLen)).join('\n');
        return result.startsWith("\n")
            ? result.replace("\n", "")
            : result;
    }
};

const createNodesFrom = (htmlStr) => {
    let $nodesWrapper = document.createElement('div');
    $nodesWrapper.innerHTML = htmlStr;
    return $nodesWrapper.childNodes;
};

const injectCSS = (cssStr) => {
    let $head = document.getElementsByTagName('head')[0],
        $style = $head.querySelector('style');

    if (!$style) {
        $style = $head.appendChild(
            document.createElement('style')
        );
        $style.type = 'text/css';
    }

    $style.appendChild(
        createNodesFrom(Trim(cssStr))[0]
    );
};

const completionWith = (fillingChar) => {
    return function(short, long) {
        return String(fillingChar).repeat(
                String(long).length - String(short).length
            ) + short;
    }
};

const textLoaidng = (cb) => {
    var text = ['-', '\\', '|', '/'],
        timmer,
        loading = false,
        counter = 0;

    return function(loading) {
        if (loading) {
            timmer = setInterval(function() {
                counter++;
                cb(text[counter % 4])
            }, 80)
        }else{
            clearInterval(timmer);
        }
    }
};


const Util = {
    createNodesFrom: createNodesFrom,
    Trim: Trim,
    injectCSS: injectCSS,
    completionWith: completionWith,
    loadingText: textLoaidng,
};
export default Util
