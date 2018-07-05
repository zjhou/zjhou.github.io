import {Get} from './Utils';
const serviceURL = 'https://zjhou.stdlib.com/cmd/';

const ama = (question) => {
    if(!question) {
        return Promise.reject('Invalid Input');
    }
    let endPoint = `${serviceURL}ama/?question=${question}`;
    return Get(endPoint);
};

export {ama};