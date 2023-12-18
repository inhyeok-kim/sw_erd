import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";

export default class RectButton extends CVElement{
    color = "rgba(255,255,255,0)";
    defaultColor = "rgba(255,255,255,0)";
    hoverColor = "lightgrey"
    textColor = "black";
    isFill : boolean = true;
    text : string;
    onClick? : Function

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number, text : string){
        super(canvas,x,y,w,h);
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.text = text;
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            ctx.lineWidth = 1;
            if(this.isReRender){
                this.render();
            }
            if(this.isFill){
                ctx.fillStyle = this.color;
                ctx.fill(this.path2D);
            } else {
                ctx.strokeStyle = this.color;
                ctx.stroke(this.path2D);
            }
            ctx.textBaseline = 'top';
            ctx.font = "12px Arial";
            ctx.fillStyle = this.textColor;
            ctx.fillText(this.text, this.x+10, this.y+((this.h - 10)/2));
        }
        super.draw();
    }

    click(context : EventContext) : boolean{
        if(this.onClick){
            this.onClick(context);
        }
        return false;
    }

    unHover(context : EventContext){
        this.canvas.style.cursor = '';
        this.isHover = false;
        this.color = this.defaultColor;
        this.isReRender = true;
        super.unHover(context);
    }
    hover(context : EventContext){
        this.canvas.style.cursor = 'pointer';
        this.isHover = true;
        this.color = this.hoverColor;
        this.isReRender = true;
        return false;
    }

}

