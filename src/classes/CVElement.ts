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
    canvas : HTMLCanvasElement;
    children : CVElement[] = [];

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
        if(this.children.length > 0){
            this.children.forEach(child=>child.draw());
        }
    }

    click(context : EventContext){
    }

    unHover(context : EventContext){
        this.children.forEach((child)=>{child.unHover(context)});
    }
    hover(context : EventContext){
    }

    move(movementX:number, movementY:number){
        this.x = this.x+movementX;
        this.y = this.y+movementY;
        this.isReRender = true;
    }

    mouseUp(context : EventContext){

    }

    mouseDown(context : EventContext){

    }
}