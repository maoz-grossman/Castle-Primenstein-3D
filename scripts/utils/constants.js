const TILE_SIZE = 50;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
const FOV_ANGLE = 60*(Math.PI/180);                //fiel of view of the palyer
const WALL_STRIP_WIDTH = 1;                         //the width of a ray cast
const NUM_RAYS = WINDOW_WIDTH/WALL_STRIP_WIDTH;    //as many as can be seen throug the screen
const HYPOTENUSE = 30;
const MINI_MAP_SCALE = 0.25;


const BUTTONS = [
  //UP
  new CustomButton(
    "down",
    30,
    WINDOW_HEIGHT - 60,
    function(){
      player.walkDirection = -1;
    },
    function(){
      player.walkDirection = 0;
    }
  ),
  new CustomButton(
    "up",
    30,
    WINDOW_HEIGHT - 130,
    function(){
      player.walkDirection = +1;
    },
    function(){
      player.walkDirection = 0;
    }
  ),
  new CustomButton(
    "left",
    WINDOW_WIDTH -100,
    WINDOW_HEIGHT - 70,
    function(){
      player.turnDirection = -1;
    },
    function(){
      player.turnDirection = 0;
    }
  ),
  new CustomButton(
    "right",
    WINDOW_WIDTH -30,
    WINDOW_HEIGHT - 70,
    function(){
      player.turnDirection = +1;
    },
    function(){
      player.turnDirection = 0;
    }
  ),
];

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };