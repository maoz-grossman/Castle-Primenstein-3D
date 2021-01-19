class Map{
    constructor(grid){
        this.grid = grid;
    }

    hasWallAt(x,y)
    {
        if(x < 0 || x > WINDOW_WIDTH || y < 0 || y > WINDOW_HEIGHT){
            return true;
        }
        //finds the closest cell of grid by x and y cordinates 
        var mapGridIndexX = Math.floor(x/TILE_SIZE);
        var mapGridIndexY = Math.floor(y/TILE_SIZE);
        //returns if the grid as a wall in this preticular cell
        return this.grid[mapGridIndexY][mapGridIndexX]==1;
    }

    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE; // every cell is 32 px tilex is its column
                var tileY = i * TILE_SIZE; // tileY is the row where the cell start
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                if (this.grid[i][j] == 3) tileColor = "#FFFF88";
                this.endPoint = [i,j];
                stroke("#222");
                fill(tileColor);
                //   startX  startY  height    width
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}