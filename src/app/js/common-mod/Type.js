class Type {
    constructor() {
        this.isAvailable = true;
    }

    humanizerDelayCall(fun, delay = 30, times = 1, ifInc) {
        let self = this;
        self.isAvailable = false;
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
                        self.isAvailable = true;
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

    input(str, inputFun, speed) {
        if(!this.isAvailable){
            return Promise.reject();
        }
        return this.humanizerDelayCall((counter) => inputFun(str.slice(0, counter)), speed, str.length, true);
    }

    del(str, inputFun, speed) {
        if(!this.isAvailable){
            return Promise.reject();
        }
        return this.humanizerDelayCall((counter) => inputFun(str.slice(0, counter)), speed, str.length);
    }

    inputAndDelete(str, inputFun, speed) {
        if(!this.isAvailable){
            return Promise.reject();
        }
        return this.Input(str, inputFun, speed)
            .then(function () {
                return this.del(str, inputFun, speed / 3);
            });
    }

    inputArray(strArr, inputFun, speed) {
        if(!this.isAvailable){
            return Promise.reject();
        }
        return strArr.reduce((p, x) =>
            p.then(() => this.inputAndDelete(x, inputFun, speed))
            , Promise.resolve());
    }
}

let type = new Type();

export default type;