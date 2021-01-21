
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

function keyPressed() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = +1;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = -1;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = +1;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = -1;
    }
}

function keyReleased() {
    if (keyCode == UP_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == DOWN_ARROW) {
        player.walkDirection = 0;
    } else if (keyCode == RIGHT_ARROW) {
        player.turnDirection = 0;
    } else if (keyCode == LEFT_ARROW) {
        player.turnDirection = 0;
    }
}

function castAllRays(){
    var rayAngle = player.rotationAngle - (FOV_ANGLE/2);
    rays = []; 
    for(var i = 0; i!=NUM_RAYS;++i){
        var ray = new Ray(rayAngle);
        ray.cast();
        rays.push(ray);
        rayAngle+=FOV_ANGLE/NUM_RAYS;
    }
}

function normalizeAngle(angle){
    // the angle shouldnt't be greater than 360°
    // and less than 0°
    angle = angle % (2* Math.PI);
    if(angle < 0 ){
        angle += (2*Math.PI);
    }
    return angle;
}

function distanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}


function render3DProjectedWalls() {
    // loop every ray in the array of rays
    for (var i = 0; i < NUM_RAYS; i++) {
        var ray = rays[i];

        // get the perpendicular distance to the wall to fix fishbowl distortion
        var correctWallDistance = ray.distance * Math.cos(ray.rayAngle - player.rotationAngle);

        // calculate the distance to the projection plane
        var distanceProjectionPlane = (WINDOW_WIDTH / 2) / Math.tan(FOV_ANGLE / 2);

        // projected wall height
        var wallStripHeight = (TILE_SIZE / correctWallDistance) * distanceProjectionPlane;
        
        // compute the transparency based on the wall distance
        var alpha = 1.0; //170 / correctWallDistance;
        
        var color = ray.wasHitVertical ? 255 : 180;

        // render a rectangle with the calculated wall height
        fill("rgba(" + color + "," + color + "," + color + "," + alpha + ")");
        noStroke();
        rect(
           i * WALL_STRIP_WIDTH,
           (WINDOW_HEIGHT / 2) - (wallStripHeight / 2),
           WALL_STRIP_WIDTH,
           wallStripHeight
        );
    }
}




