/**
*___________________________________________________________________________            	
*               		Randomized Prim's algorithm
* --------------------------------------------------------------------------
*  This algorithm is a randomized version of Prim's algorithm.
*  1. Start with a grid full of walls.
*  2. Pick a cell, mark it as part of the maze. 
*     Add the walls of the cell to the wall list.
*  3. While there are walls in the list:
*  	i) Pick a random wall from the list.
*  	   If only one of the two cells that the wall divides is visited, then:
*  		   a) Make the wall a passage and mark the unvisited cell 
*  			  as part of the maze.
*  		   b) Add the neighboring walls of the cell to the wall list.
*  	ii) Remove the wall from the list.
*   
* ----------------------------------------------------------------------------  	      
*/

class Prim{
    
    static _graph = null;
    static _ofTheMaze = null;


    //1. Start with a grid full of walls.
    static primRandomMaze(graph)
    {
        this._graph = graph;
        var numOfVerticies = this._graph.adjacent.length;
        //create an array of bool 
        //describes which vertex is part of the maze
        this._ofTheMaze = this.fillArrayWith(numOfVerticies,false);
        //2. Pick a cell, mark it as part of the maze. 
         //      Add the walls of the cell to the wall list.
        var listOfNeighbors = this._graph.adjacent[0];
        var s = listOfNeighbors[0];
        //marks the source vertex as part of the maze
        this._ofTheMaze[s.name] = true;
        var q = [];
        //Adds any neighbors of the source vertix to the queue
        for(var i=0; i!=listOfNeighbors.length;++i)
        {
            if(listOfNeighbors[i].name != s.name)
            {
                q.push(listOfNeighbors[i]);
            }
        }
        //3. While there are walls in the list:
        while(q.length!=0)
        {
            var numOfWalls = q.length;
            // i) Pick a random wall from the list.
            var randomPick = Math.floor(Math.random()* numOfWalls);
            var u = q[randomPick];
            //If only one of the two cells that the wall divides is visited
            if(this.oneOfTheTwoIsVisited(u)){
                 //a) Make the wall a passage
                 this._ofTheMaze[u.name] = true;
                 var neighborIndex = this.getNeighbor(u);
                 //get the neighbor vertex
                 //var neighbor = this._graph.adjacent[neighborIndex][0];
                 //mark the unvisited cell  as part of the maze.
                 this._ofTheMaze[neighborIndex] = true;
                 this._ofTheMaze[u.pre.name] = true;
                 //b) Add the unvisited neighboring walls of the cell to the wall list
                 var adjacentNeighbors = this._graph.adjacent[neighborIndex];
                 for(var i=0; i!= adjacentNeighbors.length ;++i){
                     var v = adjacentNeighbors[i];
                     if(v.name != s.name
                        &&
                        !(this._ofTheMaze[v.name]))
                        q.push(v);
                 }
            }
            //ii) Remove the wall from the list.
            q.splice(randomPick,1);
        }

    }

    static getMaze(){
        var maze = [];
        var temp = []
        for(var i = 0; i!= this._graph.graph.length; ++i)
        {
            temp[i] = [];
            for(var j = 0; j!= this._graph.graph[0].length;++j)
            {
                if(this._ofTheMaze[this._graph.graph[i][j]])
                    temp[i][j]=0;
                else
                    temp[i][j]=1;
            }
        }
        //adds walls around the maze
        maze[0]=[]
        for(var i = 0; i!= this._graph.graph[0].length+2; ++i)
            maze[0][i]=1;
        for(var i = 1; i!= this._graph.graph.length+1; ++i){
            maze[i]=[]
            maze[i][0]=1;
            for(var j = 1; j!= this._graph.graph[0].length+1;++j){
                maze[i][j]=temp[i-1][j-1];
            } 
            maze[i][this._graph.graph[0].length+1] = 1;
        }
        maze[this._graph.graph.length+1]=[];
        for(var i = 0; i!= this._graph.graph[0].length+2; ++i)
            maze[this._graph.graph.length+1][i]=1;

        return maze;
    }

    //gets the neighbor behind the wall 
    //it allways thake two cells with gap of a cell,
    //this is • # • or: • <-- a vertex
    //                  # <-- a wall
    //                  •
    static getNeighbor(v){
        var pre = v.pre;
        var neighbor=null;
        var i;
        var j; 
        if(v.i == pre.i)
            i = v.i;
        else 
            i= (v.i - pre.i)+v.i;
        if(v.j == pre.j)
            j = v.j;
        else
            j = (v.j - pre.j)+v.j;
        try{
            neighbor = this._graph.graph[i][j]; 
        }
        catch(err){
            return -1;
        }
        if (neighbor == null)
            return -1;
        return neighbor;
    }

    static oneOfTheTwoIsVisited(v)
    {
        var pre = v.pre;
        var neighbor = this.getNeighbor(v);
        if(neighbor == -1)
            return false;
        // if only one was visited return true
        if(this._ofTheMaze[neighbor] && !this._ofTheMaze[pre.name]
            ||
            !this._ofTheMaze[neighbor]&& this._ofTheMaze[pre.name])
            return true;
        return false;
    }

    static fillArrayWith(size, value){
        var array= []
        for(var i = 0; i!= size; ++i){
            array.push(value);
        }
        return array;
    }
}


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
        //TODO: adds function that take an array(graph)
        // and returns the number pf nodes in the graph.
        //TODO: function that find the neighbors of a node in specific graph
        var n = graphSize;        // number of nodes
        this._nodeColor = fillArrayWith(n , "WHITE"); // colors of nodes
        this.parents = fillArrayWith(n , null);       // parent of nodes
        this._distances = fillArrayWith(n , -1);      // distance from source node
        this._q = new Queue();
        this._source = source;
        this._graph = graph;
        this._nodeColor[source.name] = "GRAY";             // first visit= grey, second= black;
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



//--------------------
//
//     functions
//
//--------------------
function fillArrayWith(size, value){
    var array= []
    for(var i = 0; i!= size; ++i){
        array.push(value);
    }
    //console.log(array);
    return array;
}

function numeralArryGraph(graphArray){
    var list= [];
    count = 0;
    for (var i = 0 ; i!= graphArray.length; ++i ){
        list[i] = [];
        for(var j = 0; j!= graphArray[0].length; ++j){
            if(graphArray[i][j] == 1)
                list[i][j] = -1;
            else{
                var v = new Vertex(count++,i,j);
                list[i][j]= v;
            }
    
        }
    }
    //count = size of the graph
    // list = the actual graph;
    return [list,count];
}

function copyMatrix(matrix){
    cpyMat = [];
    for(var i = 0; i!= matrix.length; ++i){
        cpyMat[i]=[];
        for(var j = 0; j!= matrix[0].length; ++j){
            cpyMat[i][j]= matrix[i][j];
        }
    }
    return cpyMat;
}






//--------------------
//
//       Vertex
//
//--------------------
class Vertex{  
    constructor(name,i,j){
        this.name=name;
        this.i=i;
        this.j=j;
        this.pre=null;
    }
    set_pre(pre){
        this.pre= pre;
    }
}


//--------------------
//
//       Graph
//
//--------------------
class Graph{
    constructor(graph){
        this.graph = graph;
        this.adjacent = [];
        //fills the array list with neighbors 
        for(var i=0;i!=graph.length;++i){
            for(var j=0; j!=graph[0].length;++j){
                // a list of neighbors of any vertex in the graph
                var list=[];
                //the first cell is the vertex which has these neighbors
                var v = new Vertex(graph[i][j],i,j);
                list[0]=v;
                this.getNeighbors(list,v,i,j,1);
                this.adjacent[this.adjacent.length]=list;
            }
        }
    }

    getNeighbors(list,pre,i,j,skip){
        //using the graph was provide
        // returns a list full of vertex neighbors
            if(i>0)
            {
                var v =new Vertex(this.graph[i-skip][j],i-skip,j)
                v.pre = pre;
                list[list.length]=v;
            }
            if(i< this.graph.length-1)
            {
                var v =new Vertex(this.graph[i+skip][j],i+skip,j)
                v.pre = pre;
                list[list.length]=v;
            }
            if(j>0)
            {
                var v =new Vertex(this.graph[i][j-skip],i,j-skip)
                v.pre = pre;
                list[list.length]=v;
            }
            if(j<this.graph[0].length-1)
            {
                var v =new Vertex(this.graph[i][j+skip],i,j+skip)
                v.pre = pre;
                list[list.length]=v;
            }
    }

    toString(){
        var s = "";
        for(var list of this.adjacent ){
            for(var i=0; i!=list.length;++i)
            {
                s+=""+ list[i].name + "->";
            }
            s+="\n";
        }
        return s;
    }
}





//--------------------------
//
//          Queue
//
//--------------------------

function Queue(){
    var a=[],b=0;
    this.getLength=function(){return a.length-b};
    this.isEmpty=function(){return 0==a.length};
    this.enqueue=function(b){a.push(b)};
    this.dequeue=function(){
        if(0!=a.length)
        {
            var c=a[b];
            2*++b>=a.length&&(a=a.slice(b),b=0);
            return c
        }
    };
    this.peek=function(){return 0<a.length?a[b]:void 0}
    };




//-----------------------
//
//         Main
//
//-----------------------
var height = 15;
var width = 15;
index = 0;
var graph =  [];
for(var i = 0; i!=height; ++i){
    graph[i]=[];
    for (var j = 0; j!=width; ++j)
    {
        graph[i][j] = index;
        index+=1;
    }
}
var g = new Graph(graph);
Prim.primRandomMaze(g);
var maze = Prim.getMaze();
var numeralMaze = numeralArryGraph(maze);
var mazeSize = numeralMaze[1];
var mazeGraph = numeralMaze[0];
var sourcVertex = mazeGraph[1][1];
var bfs = new BFS(mazeGraph,sourcVertex,mazeSize);
maze = bfs.getPath();
var s = '';
for (var i = 0 ; i!= maze.length; ++i ){
    for(var j = 0; j!= maze[0].length; ++j){
        if(maze[i][j] == 1)
            s += ' # ';
        else if(maze[i][j] == 2)
            s += ' • '
        else
            s += '   ';
            
    }
    s+='\n';
}
console.log(s);