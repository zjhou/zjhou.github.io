import Type from './Type'
import localforage from 'localforage';

const jumpTo = (url) => {
    let a = document.createElement('a');
    a.href = url;
    a.setAttribute('target', '_blanket');
    a.click();
};

const DB = {
    query: (key) => JSON.parse(sessionStorage.getItem(key)),
    add: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    empty: () => {
        sessionStorage.clear();
    }
};

const Trim = (str) => {
    if (!str) return;
    let strArr = str.split('\n'),
        noStartSpace = strArr.filter(str => /^[^-\s].*/.test(str) && str !== '').length > 0;
    if (strArr.length === 1 || noStartSpace) {
        return str.trim();
    }
    else {
        let spaceArr = strArr.map(str => str.match(/^\s+/)).filter(v => v).map(arr => arr[0]);
        let shortestSpaceLen = Math.min.apply(null, spaceArr.map(space => space.length));
        return strArr.map(str => str.slice(shortestSpaceLen)).join('\n');
    }
};

const str2dom = (str) => {
    let parser = new DOMParser();
    return parser.parseFromString(str, 'text/html');
};

const determineLocale = () => {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage;
};

const Get = function (url, type) {
    return new Promise(function (resolve, reject) {
        const handler = function () {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            }
            else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();

        client.open('GET', url, true);
        if (type) {
            client.responseType = type;
        }

        client.onreadystatechange = handler;
        client.send();
    });
};

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
};

const getImage = async (url) => {
    let image = document.createElement('img');
    let imageBlob = await localforage.getItem(url);
    if(!imageBlob) {
        try{
            imageBlob = await Get(url, 'blob');
        }catch (e){
            throw e
        }
        localforage.setItem(url, imageBlob);
    }
    return new Promise(async function (resolve, reject) {
        image.src = window.URL.createObjectURL(imageBlob);
        image.onload = function () {
            window.URL.revokeObjectURL(image.src);
            resolve(image);
        };
        image.onerror = function () {
            reject('failed to load image');
        };
    });
};

const exec = (terminal, cmd) => {
    if(!terminal.isAvailable){
        return false;
    }
    terminal.freeze = true;
    Type.input(cmd, str => terminal.currentInput = str, 50)
        .then(() => {
            setTimeout(function () {
                terminal.execCommand(cmd);
            }, 500)
        })
        .catch(e => {
            console.log("type is busy");
        })
};

function humanizerDelayCall(fun, delay = 30, times = 1, ifInc) {
    let humanizerDelay = delay => Math.round(Math.random() * delay / 2) + delay;
    let counter = 0;
    return new Promise(function (resolve, reject) {
            let call = () => {
                if (typeof fun === 'function') {
                    if (times >= 0) {
                        fun(ifInc ? counter : times);
                        counter++;
                        times--;
                        setTimeout(call, humanizerDelay(delay));
                    }
                    else {
                        resolve('done');
                    }
                }
                else {
                    reject('invalid param');
                }
            };
            call();
        }
    );

}


function arch(posts, archName) {
    let a = {};
    posts.forEach(function (post) {
        let dateArr = post.date.split('-');
        let y = dateArr[0]
            , m = dateArr[1]
            , d = dateArr[2];

        if (a[y] === undefined)
            a[y] = {};
        if (a[y][m] === undefined)
            a[y][m] = {};
        if (a[y][m][d] === undefined)
            a[y][m][d] = [];

        a[y][m][d].push(Object.assign({
            name: post.title,
            value: post.title
        }, post));
    });
    function genTree(archObj, name) {
        let keys = Object.keys(archObj);
        if (Array.isArray(archObj)) {
            return {
                name: name,
                children: archObj.map(p => ({
                    name: p.title,
                    value: p.title,
                    children: []
                }))
            };
        }
        else {
            return {
                name: name,
                children: keys.sort().map(key => {
                        return genTree(archObj[key], key);
                    }
                )
            };

        }
    }

    return genTree(a, archName);
}

const isMobile = () => window.innerWidth < 500;

export {
    jumpTo, Trim, getImage, DB,
    determineLocale, Get, str2dom,
    getRandomIntInclusive, humanizerDelayCall,
    isMobile, arch, exec
};