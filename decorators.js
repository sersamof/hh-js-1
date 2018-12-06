const perfomanceLogger = (funcName, fun) => (...args) => {
    const symb = funcName;
    console.time(symb);
    const retVal = fun(...args);
    console.timeEnd(symb);
    return retVal;
};

const valueLogger = (funcName, fun) => (...args) => {
    const retVal = fun(...args);
    console.log(funcName, ' result= ', retVal);
    return retVal;
};

const callLogger = (funcName, fun) => (...args) => {
    console.log('call ', funcName);
    return fun(...args);
};

function callCounter() {
    this.counter = {};
    const c = (funcName, fun) => (...args) => {
        this.counter[funcName] || (this.counter[funcName] = 0);
        this.counter[funcName] += 1;
        return fun(...args);
    };
    c.getCount = () => this.counter;
    return c;
}

const callCounterFactory = () => callCounter();

module.exports = {
    perfomanceLogger,
    callLogger,
    valueLogger,
    callCounterFactory,
};
