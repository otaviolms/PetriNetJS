class Arc{
    constructor(origem){
        this.origem = origem;
    }
    
    to(destino){
        console.log('DESTINO');
        this.destino = destino;
    }
    
    show(){
        stroke(0);
        if(this.destino){
            line(this.origem.x, this.origem.y, this.destino.x, this.destino.y);
            let transX;
            let transY;
            if(this.destino.size){
                transX = (this.destino.x - (this.destino.size/2));
                transY = this.destino.y;
            } else {
                transX = (this.destino.x - (this.destino.width/2));
                transY = this.destino.y;
            }
            translate(transX, transY);
            angleMode(DEGREES);
            rotate(45);
            line(0, 0, 0, 5);
//            triangle(6, 6, 0, -6, -6, 6);
            rotate(90);
            line(0, 0, 0, 5);
            rotate(-(90+45));
            
            translate(-transX, -transY);
        } else {
            line(this.origem.x, this.origem.y, mouseX, mouseY);
        }
    }
}