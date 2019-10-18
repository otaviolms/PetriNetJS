var places = [];
var transitions = [];
var arcs = [];
var arcId = -1;
var arcOrgTra = false;
var select;
var origem;
var sel = -1;
var selecionado = false;
var tool = 0;
var tools = [];
var selectedItens = [];
var mix = 0;
var miy = 0;

//0 - Place
//1 - Arc
//2 - Move

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    for(var i = 10; i < 300; i += 60){
        tools.push(new Tool(i, 10));
    }
}

function draw() {
    background(240);
    for(let i = 0; i < arcs.length; i++){
        arcs[i].show();
    }
    for(let i = 0; i < places.length; i++){
        places[i].show();
    }
    for(let i = 0; i < transitions.length; i++){
        transitions[i].show();
    }
    for(let i = 0; i < tools.length; i++){
        if(i != tool){
            tools[i].desSelect();
        }
        tools[i].show();
    }
    if(select){
        select.show(mouseX, mouseY);
    }
}

//=============================================== TECLADO ===============================================
function keyPressed() {
    console.log(keyCode);
    switch (keyCode){
        case 27: // ESC
            if(tool == 2){
                if(origem){
                    arcs.splice(arcs.length-1, 1);
                    arcId = -1;
                    arcOrgTra = false;
                    origem = undefined;
                    deselectAll();
                }
            }
            break;
        case 46: // DELETE
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    places.splice(i, 1);
                    i--;
                }
            }
            for(let i = 0; i < transitions.length; i++){
                if(transitions[i].selected){
                    transitions.splice(i, 1);
                    i--;
                }
            }
            break;
        case 65: // A
            let min_h = -1;
            let max_h = -1;
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    if(min_h == -1 && max_h == -1){
                        min_h = places[i].x;
                        max_h = places[i].x;
                    }
                    if(places[i].x > max_h){
                        max_h = places[i].x;
                    }
                    if(places[i].x < min_h){
                        min_h = places[i].x;
                    }
                }
            }
            let meio_h = (max_h+min_h)/2;
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    places[i].x = meio_h;
                }
            }
            break;
        case 68: // D
            let min_h_t = -1;
            let max_h_t = -1;
            for(let i = 0; i < transitions.length; i++){
                if(transitions[i].selected){
                    if(min_h_t == -1 && max_h_t == -1){
                        min_h_t = transitions[i].x;
                        max_h_t = transitions[i].x;
                    }
                    if(transitions[i].x > max_h_t){
                        max_h_t = transitions[i].x;
                    }
                    if(transitions[i].x < min_h_t){
                        min_h_t = transitions[i].x;
                    }
                }
            }
            let meio_h_t = (max_h_t+min_h_t)/2;
            for(let i = 0; i < transitions.length; i++){
                if(transitions[i].selected){
                    transitions[i].x = meio_h_t;
                }
            }
            break;
        case 82: // R
            for(let i = 0; i < transitions.length; i++){
                if(transitions[i].selected){
                    transitions[i].rotate();
                }
            }
            break;
        case 83: // S
            let min_v = -1;
            let max_v = -1;
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    if(min_v == -1 && max_v == -1){
                        min_v = places[i].y;
                        max_v = places[i].y;
                    }
                    if(places[i].y > max_v){
                        max_v = places[i].y;
                    }
                    if(places[i].y < min_v){
                        min_v = places[i].y;
                    }
                }
            }
            let meio_v = (max_v+min_v)/2;
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    places[i].y = meio_v;
                }
            }
            break;
        case 81: // Q
            let ordenado_qv = [];
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    ordenado_qv.push([i, places[i].y]);
                }
            }
            if(ordenado_qv.length > 0){
                ordenado_qv.sort(function(a, b){
                    return a[1] - b[1];
                });
                let min_qv = ordenado_qv[0][1];
                let max_qv = ordenado_qv[ordenado_qv.length-1][1];
                let step = (max_qv - min_qv)/(ordenado_qv.length-1);
                let pos = min_qv;
                for(let i = 0; i < ordenado_qv.length; i++){
                    places[ordenado_qv[i][0]].y = pos;
                    pos += step;
                }
            }
            break;
        case 69: // E
            let ordenado_qv_t = [];
            for(let i = 0; i < transitions.length; i++){
                if(transitions[i].selected){
                    ordenado_qv_t.push([i, transitions[i].y]);
                }
            }
            if(ordenado_qv_t.length > 0){
                ordenado_qv_t.sort(function(a, b){
                    return a[1] - b[1];
                });
                let min_qv_t = ordenado_qv_t[0][1];
                let max_qv_t = ordenado_qv_t[ordenado_qv_t.length-1][1];
                let step = (max_qv_t - min_qv_t)/(ordenado_qv_t.length-1);
                let pos_t = min_qv_t;
                for(let i = 0; i < ordenado_qv_t.length; i++){
                    transitions[ordenado_qv_t[i][0]].y = pos_t;
                    pos_t += step;
                }
            }
            break;
        case 87: // W
            let ordenado_qh = [];
            for(let i = 0; i < places.length; i++){
                if(places[i].selected){
                    ordenado_qh.push([i, places[i].x]);
                }
            }
            if(ordenado_qh.length > 0){
                ordenado_qh.sort(function(a, b){
                    return a[1] - b[1];
                });
                let min_qh = ordenado_qh[0][1];
                let max_qh = ordenado_qh[ordenado_qh.length-1][1];
                let step = (max_qh - min_qh)/(ordenado_qh.length-1);
                let pos = min_qh;
                for(let i = 0; i < ordenado_qh.length; i++){
                    places[ordenado_qh[i][0]].x = pos;
                    pos += step;
                }
            }
            break;
    }
}

//=============================================== MOUSE ===============================================
function mousePressed() {
    for(let i = 0; i < tools.length; i++){
        if(tools[i].clicado(mouseX, mouseY)){
            tool = i;
        }
    }
    for(let i = 0; i < places.length; i++){
        if(!places[i].selected){
            if(places[i].clicado(mouseX, mouseY)){
                for(let j = 0; j < places.length; j++){
                    places[j].desSelect();
                }
                places[i].select();
                sel = i;
                break;
            }
        } else if(places[i].selected && places[i].clicado(mouseX, mouseY)){
            sel = i;
            break;
        }
    }
    for(let i = 0; i < transitions.length; i++){
        if(!transitions[i].selected){
            if(transitions[i].clicado(mouseX, mouseY)){
                for(let j = 0; j < transitions.length; j++){
                    transitions[j].desSelect();
                }
                transitions[i].select();
                sel = i;
                break;
            }
        } else if(
          transitions[i].selected && transitions[i].clicado(mouseX, mouseY)
        ){
            sel = i;
            break;
        }
    }
    if(tool == 2){
        let obj;
        for(let i = 0; i < places.length; i++){
            if(places[i].clicado(mouseX, mouseY)){
                deselectAll();
                if(!origem){
                    arcOrgTra = false;
                    places[i].selectArc();
                    obj = places[i];
                } else if(origem && arcOrgTra){
                    places[i].selectArc();
                    obj = places[i];
                }
            }
        }
        for(let i = 0; i < transitions.length; i++){
            if(transitions[i].clicado(mouseX, mouseY)){
                deselectAll();
                if(!origem){
                    arcOrgTra = true;
                    transitions[i].selectArc();
                    obj = transitions[i];
                } else if(origem && !arcOrgTra){
                    transitions[i].selectArc();
                    obj = transitions[i];
                }
            }
        }
        if(obj){
            if(origem){
                arcs[arcId-1].to(obj);
                origem = undefined;
                arcId = -1;
                deselectAll();
            } else {
                let arc = new Arc(obj);
                origem = obj;
                arcId = arcs.push(arc);
            }
        }
    }
}

function mouseDragged(){
    switch (tool){
        default:
        case 0:
        case 1:
            if(select){
                for(let i = 0; i < places.length; i++){
                    places[i].intersect(
                      select.initX, select.initY, mouseX, mouseY
                    );
                }
                for(let i = 0; i < transitions.length; i++){
                    transitions[i].intersect(
                      select.initX, select.initY, mouseX, mouseY
                    );
                }
            } else if(sel >= 0){
                let difx = pmouseX - mouseX;
                let dify = pmouseY - mouseY;
                for(let i = 0; i < places.length; i++){
                    if(places[i].selected){
                        places[i].x -= difx;
                        places[i].y -= dify;
                    }
                }
                for(let i = 0; i < transitions.length; i++){
                    if(transitions[i].selected){
                        transitions[i].x -= difx;
                        transitions[i].y -= dify;
                    }
                }
            } else if(!select){
                select = new Select(mouseX, mouseY);
            }
            break;
        case 2:
            console.log('NADA');
            break;
    }
}

function mouseReleased(){
    if(!select && sel < 0 && tool != 2){
        existeSelecionados();
        if(selecionado){
            deselectAll();
        } else {
            if(!(mouseX < 320 && mouseY < 80)){
                switch(tool){
                    default:
                    case 0:
                        let p = new Place(mouseX, mouseY);
                        places.push(p);
                        break;
                    case 1:
                        let t = new Transition(mouseX, mouseY);
                        transitions.push(t);
                        break;
                }
            }
        }
    }
    sel = -1;
    select = null;
}

//=============================================== MÉTODOS ===============================================
function existeSelecionados(){
    for(let i = 0; i < places.length; i++){
        if(places[i].selected){
            selecionado = true;
            return true;
        }
    }
    for(let i = 0; i < transitions.length; i++){
        if(transitions[i].selected){
            selecionado = true;
            return true;
        }
    }
}

function deselectAll(){
    for(let i = 0; i < places.length; i++){
        places[i].desSelect();
    }
    for(let i = 0; i < transitions.length; i++){
        transitions[i].desSelect();
    }
    selecionado = false;
}