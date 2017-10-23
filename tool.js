class Tool{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = {
            'r':255,
            'g':255,
            'b':255
        };
    }
    
    clicado(x, y){
        if(x > this.x && x < (this.width + this.x) && y > this.y && y < (this.height + this.y)){
            this.select();
            return true;
        }
    }
    
    select(){
        this.color = {
            'r':255,
            'g':255,
            'b':255
        };
        this.selected = true;
    }
    
    desSelect(){
        this.color = {
            'r':150,
            'g':150,
            'b':150
        };
        this.selected = false;
    }
    
    show(){
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.x, this.y, this.width, this.height);
    }
}