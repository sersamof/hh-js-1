function parseNames(fun) {
    const pattern = /[^(]*\(([^)]*)\)/;
    var args = fun
        .toString()
        .match(pattern)[1]
        .split(/,\s*/)
        .filter((arg) => arg !== '');
    return args;
}

class GraphEval {
    constructor() {
        this.decorator = this.__memoizeHook;
    }

    __memoizeHook(funcName, fun) {
        let computed;
        return (...args) => {
            if (computed === undefined) {
                computed = fun(...args);
            }
            return computed;
        };
    }

    receiveGraph(graph) {
        this.graph = {};
        this.args = {};
        this.called = {};
        this.stack = [];
        for (let vertex in graph) {
            this.args[vertex] = parseNames(graph[vertex]);
            this.graph[vertex] = this.decorator(vertex, graph[vertex]);
        }
        return this;
    }

    calcVertex(vertexName) {
        return this.__evalVertex(vertexName);
    }

    __evalVertex(vertexName) {
        this.stack.push(vertexName);
        if (this.called[vertexName]) {
            throw 'Cyclic dependencies. Stack: ' + this.stack.join(' -> ');
        }
        this.called[vertexName] = true;

        const fun = this.graph[vertexName];
        if (fun === undefined) {
            throw 'Unknown vertex ' + vertexName;
        }

        const argValues = this.__evalArgs(vertexName);
        const retVal = fun(...argValues);

        this.called[vertexName] = null;
        this.stack.pop();
        return retVal;
    }

    __evalArgs(vertexName) {
        const argNames = this.args[vertexName];
        const argValues = [];
        for (let arg of argNames) {
            argValues.push(this.__evalVertex(arg));
        }
        return argValues;
    }

    with(decorator) {
        const prevHook = this.decorator;
        this.decorator = (funcName, ...args) =>
            decorator(funcName, prevHook(funcName, ...args));
        return this;
    }
}
module.exports = GraphEval;
