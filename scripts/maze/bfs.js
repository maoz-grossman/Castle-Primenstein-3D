//-------------------------------------------------------------//
//*************************************************************//
//                  Breadth-first search                       //   
//____________________________________________________________ //
// Breadth-first search (BFS) is an algorithm for traversing   //
// or searching tree or graph data structures.                 //
// It starts at the tree root (or some arbitrary node of       // 
// a graph, sometimes referred to as a 'search key'[1]),       //
// and explores all of the neighbor nodes at the present depth // 
// prior to moving on to the nodes at the next depth level.    //
//*************************************************************//
//-------------------------------------------------------------//

class BFS{

    constructor(graph , source,graphSize){
        var n = graphSize;                            // number of nodes
        this._nodeColor = fillArrayWith(n , "WHITE"); // colors of nodes
        this.parents = fillArrayWith(n , null);       // parent of nodes
        this._distances = fillArrayWith(n , -1);      // distance from source node
        this._q = new Queue();
        this._source = source;
        this._graph = graph;
        this._nodeColor[source.name] = "GRAY";        // first visit= grey, second= black;
        this._distances[source.name] = 0;  
        this._q.enqueue(source);
        this.initiate();
    }

    initiate(){

        while (this._q.getLength() != 0){
            var v = this._q.dequeue();
            var neighborsOfV = this._getNeighborsOfVertex(v);
            for(var i = 0; i!=neighborsOfV.length; ++i){
                var u = neighborsOfV[i];
                if(this._nodeColor[u.name]== "WHITE"){
                    this._nodeColor[u.name] = "GRAY";
                    this._distances[u.name] = this._distances[v.name]+1;
                    this.parents[u.name] = v;
                    this._q.enqueue(u);
                }
            }
            this._nodeColor[v.name] = "BLACK";
        }
    }


    getPath(){
        maze = copyMatrix(this._graph);
        //need to fix copyMatrix
        var par = this.parents[this.parents.length -1];
        maze[par.i][par.j] = -2 ;
        while(this._source.name != par.name){
            par = this.parents[par.name];
            maze[par.i][par.j] = -2 ;
        }
        for(var i = 0; i!= maze.length; ++i){
            for(var j = 0; j!= maze[0].length; ++j){
                if(maze[i][j] == -2) maze[i][j] = 2;
                else if(maze[i][j] == -1) maze[i][j] = 1;
                else maze[i][j]=0;
            }
        }
        return maze;
    }


    _getNeighborsOfVertex(vertex, skip=1){
        var i = vertex.i;
        var j = vertex.j;
        var list=[];
        try{
                if (this._graph[i - skip][j] != -1)
                {
                    let v = new Vertex(this._graph[i - skip][j].name, i - skip, j);
                    v.pre = null;
                    list[list.length] = v;
                }

            }
        catch (err){}
        try
        {
            if (this._graph[i + skip][j] != -1)
            {
                    let v = new Vertex(this._graph[i + skip][ j].name, i + skip, j);
                    v.pre = null;
                    list[list.length] = v;
            }
        }
        catch (err){}
        try
        {
            if (this._graph[i][ j - skip] != -1)
            {
                let v = new Vertex(this._graph[i][ j - skip].name, i, j - skip);
                v.pre = null;
                list[list.length] = v;
            }
        }
        catch (err){}
        try
        {
            if (this._graph[i][ j + skip] != -1)
            {
                let v = new Vertex(this._graph[i][ j + skip].name, i, j + skip);
                v.pre = null;
                list[list.length] = v;
            }
        }
        catch (err ){}
        return list;
    }

}

