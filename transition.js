class Transition{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = {
            'r':255,
            'g':255,
            'b':255
        };
        this.width = 10;
        this.height = 26;
    }
    
    move(x, y){
        this.x = x;
        this.y = y;
    }
    
    rotate(){
        let aux = this.width;
        this.width = this.height;
        this.height = aux;
    }
    
    clicado(x, y){
        if(
            x > (this.x - this.width/2) && x < ((this.width/2) + this.x) &&
          y > (this.y - this.height/2) && y < ((this.height/2) + this.y)
        ){
            this.select();
            return true;
        }
    }
    
    intersect(ix, iy, fx, fy){
        let maiorX = ix > fx ? ix : fx;
        let menorX = ix > fx ? fx : ix;
        let maiorY = iy > fy ? iy : fy;
        let menorY = iy > fy ? fy : iy;
        if(
            this.x > menorX && this.x < maiorX &&
            this.y > menorY && this.y < maiorY
        ){
            if(!this.selected){
                this.select();
                return true;
            }
        } else {
            this.desSelect();
        }
    }
    
    selectArc(){
        this.color = {
            'r':255,
            'g':150,
            'b':150
        };
        this.selected = true;
    }
    
    select(){
        this.color = {
            'r':150,
            'g':150,
            'b':255
        };
        this.selected = true;
    }
    
    desSelect(){
        this.color = {
            'r':255,
            'g':255,
            'b':255
        };
        this.selected = false;
    }
    
    show(){
        rectMode(CENTER);
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.x, this.y, this.width, this.height);
        rectMode(CORNER);
    }
}