class Player {
    constructor() {
        this.x = TILE_SIZE / 2 +TILE_SIZE;
        this.y = TILE_SIZE / 2 + TILE_SIZE;
        this.radius = 3;
        this.turnDirection = 0; // -1 if left, +1 if right
        this.walkDirection = 0; // -1 if back, +1 if front
        this.rotationAngle = Math.PI / 2;
        this.moveSpeed = 2.0;
        this.rotationSpeed = 2 * (Math.PI / 180);
    }

    update() {
        this.rotationAngle += this.turnDirection * this.rotationSpeed;

        var moveStep = this.walkDirection * this.moveSpeed;

        var newPointx = this.x + Math.cos(this.rotationAngle) * moveStep;
        var newPointy = this.y + Math.sin(this.rotationAngle) * moveStep;
        if(!grid.hasWallAt(newPointx ,newPointy))
        {
            this.x = newPointx;
            this.y = newPointy;
        }
    }
    render() {
        noStroke();
        fill("red");
        circle(
            MINI_MAP_SCALE*this.x, 
            MINI_MAP_SCALE*this.y, 
            MINI_MAP_SCALE*this.radius);
            
        //            (end.x,end.y)   
        //       hyp /|
        //          / | opp        => end.x = x + adj       
        //         /__|            => end.y = y + oop
        //    (x,y) adj            α = rotationAngle , player position=(x,y)
        //                         oop = sin(α)*hyp, adj = cos(α)*hyp  
        stroke("yellow");
        line(
            MINI_MAP_SCALE*this.x,                                              //starting point x
            MINI_MAP_SCALE*this.y,                                              //starting point y
            MINI_MAP_SCALE*this.x + Math.cos(this.rotationAngle) * HYPOTENUSE,  //ending point x
            MINI_MAP_SCALE*this.y + Math.sin(this.rotationAngle) * HYPOTENUSE   //ending point y
        );
    }
}