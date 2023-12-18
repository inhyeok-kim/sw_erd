import CVElement from "../../CVElement";
import { EventContext } from "../../MouseObject";
import ContextAPI from "../../api/ContextAPI";
import Text from "../Text";

export default class Column extends CVElement{
    color : string = "rgba(220, 224, 217,0.1)";
    text : string;


    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number,text : string){
        super(canvas,x,y,w,h);
        this.text = text;
        const tableName = new Text(canvas,x+10,y+10,text)
        tableName.fontColor = 'black';
        tableName.color = 'rgba(255,255,255,0)';
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
            ctx.fill(this.path2D);
        }
        super.draw(ctx);
    }

    rightClick(context: EventContext): boolean {
        ContextAPI.openContextMenu(context,'column');
        return false;
    }

    unHover(context : EventContext){
        super.unHover(context);
    }
    hover(context : EventContext) : boolean{
        return true;
    }

    mouseDown(context: EventContext): boolean {
        return true;
    }

}

