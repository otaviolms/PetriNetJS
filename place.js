class Place{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = {
            'r':255,
            'g':255,
            'b':255
        };
        this.size = 25;
    }

    move(x, y){
        this.x = x;
        this.y = y;
    }

    clicado(x, y){
        let d = dist(x, y, this.x, this.y);
        if(d < (this.size / 2)){
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
        fill(this.color.r, this.color.g, this.color.b);
        ellipse(this.x, this.y, this.size, this.size);
    }
}