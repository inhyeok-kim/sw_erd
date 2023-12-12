import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";

export default class Rect extends CVElement{
    color : string = "black";
    isFill : boolean = false;

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number){
        super(canvas,x,y,w,h);
        this.path2D.rect(this.x,this.y,this.w,this.h);
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            if(this.isReRender){
                this.path2D = new Path2D();
                this.path2D.rect(this.x,this.y,this.w,this.h);
                this.isReRender = false;
            }
            if(this.isFill){
                ctx.fillStyle = this.color;
                ctx.fill(this.path2D);
            } else {
                ctx.strokeStyle = this.color;
                ctx.stroke(this.path2D);
            }
        }
        super.draw();
    }

}

