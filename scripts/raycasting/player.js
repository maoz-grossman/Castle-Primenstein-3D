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
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.rotationAngle) * 30,
            this.y + Math.sin(this.rotationAngle) * 30
        );
    }
}