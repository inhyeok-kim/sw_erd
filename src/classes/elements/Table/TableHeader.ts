import CVElement from "../../CVElement";
import { EventContext } from "../../MouseObject";
import Text from "../Text";

export default class TableHeader extends CVElement{
    color : string = "rgba(220, 224, 217)";
    isFill : boolean = true;

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number,text : string){
        super(canvas,x,y,w,h);
        const tableName = new Text(canvas,x+10,y+10,text)
        tableName.fontColor = 'black';
        tableName.fontWeight = 'bold';
        tableName.color = 'rgba(255, 255, 255,0)';
        tableName.fontSize = 13;
        tableName.isEditable = true;
        this.children.push(tableName);
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    draw(ctx : CanvasRenderingContext2D){
        if(ctx){
            if(this.isReRender){
                this.render();
            }
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            if(this.isFill){
                ctx.fill(this.path2D);
            } else {
                ctx.stroke(this.path2D);
            }
        }
        super.draw(ctx);
    }

    unHover(context : EventContext){
        super.unHover(context);
    }
    hover(context : EventContext) : boolean{
        return true;
    }

    rightClick(context: EventContext): boolean {
        return true;
    }

    mouseDown(context: EventContext): boolean {
        return true;
    }

}

