const TILE_SIZE = 50;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
const FOV_ANGLE = 60*(Math.PI/180);                //fiel of view of the palyer
const WALL_STRIP_WIDTH = 1                         //the width of a ray cast
const NUM_RAYS = WINDOW_WIDTH/WALL_STRIP_WIDTH;    //as many as can be seen throug the screen
const HYPOTENUSE = 30;
const MINI_MAP_SCALE = 0.25;
