function memoize(fun) {
    let computed;
    return () => {
        if (computed === undefined) {
            computed = fun();
        }
        return computed;
    };
}

function node(fun, preHook, postHook) {
    const graphNode = ((f) => () => {
        if (typeof preHook === 'function') {
            preHook();
        }
        const ret = f();
        if (typeof postHook === 'function') {
            postHook();
        }
        return ret;
    })(memoize(fun));
    graphNode.toString = graphNode.valueOf = () => graphNode();
    return graphNode;
}

function perfomanceHook(name) {
    const symb = Symbol(name);
    preHook = () => console.time(symb);
    postHook = () => console.timeEnd(symb);
    return { preHook, postHook };
}

function stats(xs) {
    const perfHook = perfomanceHook('m');

    const n = node(() => xs.length);
    const m = node(
        () => xs.reduce((acc, val) => acc + val, 0) / n(),
        perfHook.preHook,
        perfHook.postHook
    );
    const m2 = node(() => xs.reduce((acc, val) => acc + val * val, 0) / n());
    const v = node(() => m2() - m() * m());
    return { n, m, m2, v };
}

const t = stats([1, 2, 3, 4, 5]);
console.log(t.v());

const longArr = Array.apply(null, { length: 100000 }).map(Math.random);
const stat = stats(longArr);
console.log('n=', stat.n());
console.log('v=', stat.v());
