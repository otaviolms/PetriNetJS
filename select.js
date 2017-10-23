class Select{
    constructor(x, y){
        this.initX = x;
        this.initY = y;
    }
    
    show(x, y){
        fill(150, 150, 255, 50);
        stroke(100, 100, 230, 50);
        rect(this.initX, this.initY, x - this.initX, y - this.initY);
        stroke(0);
    }
}