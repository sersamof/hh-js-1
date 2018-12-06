const LazyGraph = require('./LazyGraph');
const EagerGraph = require('./EagerGraph');

const {
    perfomanceLogger,
    callLogger,
    valueLogger,
    callCounterFactory,
} = require('./decorators');

const longArr = Array.apply(null, { length: 100000 }).map(Math.random);
const graphStat = {
    n: (xs) => xs.length,
    m: (xs, n) => xs.reduce((acc, val) => acc + val, 0) / n,
    m2: (xs, n) => xs.reduce((acc, val) => acc + val * val, 0) / n,
    v: function(m, m2) {
        return m2 - m * m;
    },
    xs: () => longArr,
};

// perfomanceLogger позволяет замерять время вычисления каждой ноды
// callLogger выводит на консоль сообщение о начале вычисления ноды
// valueLogger выводит на консоль результат вычисления ноды
// counterFactory создает декоратор для подсчета числа вызовов вычисления ноды

const counter1 = callCounterFactory();
const graph = new LazyGraph()
    .with(counter1)
    .with(perfomanceLogger)
    //.with(callLogger)
    //.with(valueLogger)
    .receiveGraph(graphStat);
const v1 = graph.calcVertex('v');
console.log(v1);
console.log(counter1.getCount());

const counter2 = callCounterFactory();
const graph2 = new EagerGraph()
    .with(counter2)
    .with(perfomanceLogger)
    //.with(callLogger)
    //.with(valueLogger)
    .receiveGraph(graphStat);
const v2 = graph2.calcVertex('v');
console.log(v2);
console.log(counter2.getCount());
