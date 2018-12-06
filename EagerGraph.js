const GraphEval = require('./GraphEval');

class EagerGraph extends GraphEval {
    receiveGraph(graph) {
        super.receiveGraph(graph);
        this.values = {};
        for (let vertex in graph) {
            this.values[vertex] = this.__evalVertex(vertex);
        }
        return this;
    }

    calcVertex(vertexName) {
        return this.values[vertexName];
    }
}
module.exports = EagerGraph;
