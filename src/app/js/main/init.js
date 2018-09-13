import {exec, getRandomIntInclusive} from '../common-mod/Utils';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import localforage from 'localforage';

export default async function () {
    window.mixpanel.track('page view');
    Array.prototype.randEle = function() {
        return this[getRandomIntInclusive(0, this.length - 1)];
    };
    OfflinePluginRuntime.install();
    window.cache = window.navigator.onLine
        ? {titles: []}
        : await localforage.getItem('cache');

    document.addEventListener('click', function (evt) {
        let isCommand = Array.from(evt.target.classList).includes('command');
        let command = evt.target.getAttribute('data-cmd');
        if(isCommand && command){
            try{
                exec(window.terminal, command);
            }catch (e){
                console.error(JSON.stringify(e));
            }
        }
    });
}