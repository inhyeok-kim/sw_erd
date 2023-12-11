import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";
import Text from "./Text";

export default class Table extends CVElement{
    color : string = "black";
    isFill : boolean = false;
    children : CVElement[] = [];

    constructor(canvas : HTMLCanvasElement,x : number,y : number){
        super(canvas,x,y,100,100);
        this.children.push(new Text(canvas,x+10, y+10,80,10,'Table Name'));
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
            this.children.forEach(child=>child.draw());
        }
    }

    click(x:number,y:number){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            for(let i=this.children.length-1; i >= 0; i--){
                const ele = this.children[i];
                const isPointInPath = ctx.isPointInPath(ele.path2D,x, y);
                if(isPointInPath){
                    ele.click(x,y);
                }
            }
        }
    }

    unHover(context : EventContext){
        this.isHover = false;
        this.color = 'black';
        this.isReRender = true;
    }
    hover(context : EventContext){
        this.isHover = true;
        this.color = 'red';
        this.isReRender = true;
    }

}

