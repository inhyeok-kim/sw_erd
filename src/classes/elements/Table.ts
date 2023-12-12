import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";
import { putMovement } from "../Movement";
import InputText from "./InputText";

export default class Table extends CVElement{
    color : string = "black";
    isFill : boolean = false;

    constructor(canvas : HTMLCanvasElement,x : number,y : number){
        super(canvas,x,y,100,100);
        this.children.push(new InputText(canvas,x+10, y+10,80,10,'Table Name'));
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    move(x:number, y:number){
        super.move(x,y);
        this.children.forEach(child=>{
            child.move(x,y);
        })
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            if(this.isReRender){
                this.path2D = new Path2D();
                this.path2D.rect(this.x,this.y,this.w,this.h);
                this.isReRender = false;
            }
            ctx.fillStyle = "white";
            ctx.fill(this.path2D);
            ctx.strokeStyle = this.color;
            ctx.stroke(this.path2D);
        }
        super.draw();
    }

    click(context : EventContext){
    }

    unHover(context : EventContext){
        this.canvas.style.cursor = "";
        super.unHover(context);
    }
    hover(context : EventContext){
        this.canvas.style.cursor = "move";
    }

    mouseDown(context: EventContext): void {
        putMovement(this);
    }

    mouseUp(context: EventContext): void {
        
    }

}

