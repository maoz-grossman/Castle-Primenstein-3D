class CustomButton{
    constructor(name,x,y,pressedFunction,releasedFunction){
        this.x = x;
        this.y = y;
        this.radius = 24;
        this.pressedFunction = function(){ 
           let distan = distanceBetweenPoints(this.x,this.y,mouseX,mouseY);
            if(distan<=this.radius) pressedFunction();}
        this.releasedFunction = function(){ 
            let distan = distanceBetweenPoints(this.x,this.y,mouseX,mouseY);
            if(distan<=this.radius) releasedFunction();}
    }

    render(){
        noStroke();
        fill("rgba(49, 49, 49, 0.70)");
        circle(
            this.x, 
            this.y, 
            this.radius);
    }

}