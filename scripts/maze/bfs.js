class BFS{
    constructor(graph , source){
        var n = graph.length* graph[0].length;        // number of nodes
        this._nodeColor = fillArrayWith(n , "WHITE"); // colors of nodes
        this.parents = fillArrayWith(n , null);       // parent of nodes
        this._distances = fillArrayWith(n , -1);      // distance from source node
        this._q = new Queue();
        this._source = source;
        this._graph = graph;
        this._nodeColor[source] = "GRAY";             // first visit= grey, second= black;
        this._distances[source] = 0;  
        this._q.enqueue(source);
        this.initiate();
    }

    initiate(){

        while (this._q.getLength() != 0){
            var v = this._q.dequeue();
        }
    }

}