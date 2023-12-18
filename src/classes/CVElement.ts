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

    click(context : EventContext) : boolean{
        return false;
    }
    rightClick(context : EventContext) : boolean{
        return false;
    }

    unHover(context : EventContext){
        this.children.forEach((child)=>{child.unHover(context)});
    }
    hover(context : EventContext) : boolean{
        return false;
    }

    move(movementX:number, movementY:number){
        this.x = this.x+movementX;
        this.y = this.y+movementY;
        this.children.forEach(child=>{
            child.move(movementX,movementY);
        })
        this.isReRender = true;
    }

    moveTo(x:number, y:number){
        const gapX = x - this.x;
        const gapY = y - this.y;
        this.x = x;
        this.y = y;
        this.children.forEach(child=>{
            child.move(gapX,gapY);
        })
        this.isReRender = true;
    }

    mouseUp(context : EventContext) : boolean {
        return false
    }

    mouseDown(context : EventContext) : boolean{
        return false;
    }
}