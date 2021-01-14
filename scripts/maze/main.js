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
maze = Prim.getMaze();
s = '';
for (var i = 0 ; i!= maze.length; ++i ){
    for(var j = 0; j!= maze[0].length; ++j){
        if(maze[i][j] == 1)
            s += ' # ';
        else
            s += '   ';

    }
    s+='\n';
}
console.log(s);