import { EventContext } from "./MouseObject";

export default class CVElement {
    x : number;
    y : number;
    w : number;
    h : number;
    z : number;
    path2D : Path2D;
    isHover : boolean = false;
    isReRender : boolean = true;
    canvas : HTMLCanvasElement

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.z = 0;
        this.path2D = new Path2D();
        this.canvas = canvas;
    }

    draw(){
    }

    click(x:number,y:number){
    }

    unHover(context : EventContext){
        
    }
    hover(context : EventContext){
    }

    move(x:number, y:number){
        this.x = this.x+x;
        this.y = this.y+y;
        this.isReRender = true;
    }

    mouseDown(){

    }
}