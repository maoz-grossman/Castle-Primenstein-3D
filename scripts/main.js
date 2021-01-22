
//-----------------------
//
//         Main
//
//-----------------------


//--------------------
//   maze generator
//--------------------
var height = MAP_NUM_ROWS-2;
var width = MAP_NUM_COLS-2;
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
            s += ' 0 '
        else
            s += '   ';
            
    }
    s+='\n';
}
console.log(s);
maze[height][width]=3;
var string = getDeviceType();
console.log(string);


//------------------
//   ray casting
//------------------
var grid = new Map(maze);
var player = new Player();
var rays = [] // list of rays to be casted
//butty = new CustomButton("up");


function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}
function update() {
    player.update();
    castAllRays();
}

function draw() {
    clear("#111");
    update();
    render3DProjectedWalls();
    grid.render();
    let index = 0;
    for(ray of rays){
        if (index % 4 == 0)
            ray.render();
        index++;
    }
    player.render();
    for(butt of BUTTONS){
        butt.render();
    }
}