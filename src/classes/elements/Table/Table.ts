import CVElement from "../../CVElement";
import { EventContext } from "../../MouseObject";
import { putMovement } from "../../Movement";
import ContextAPI from "../../api/ContextAPI";
import Column from "./Column";
import TableHeader from "./TableHeader";

export default class Table extends CVElement{
    color : string = "rgba(255,255,255,0)";
    isFill : boolean = false;
    columnList : string[] = []

    constructor(canvas : HTMLCanvasElement,x : number,y : number){
        super(canvas,x,y,150,92);
        const tableNameBox = new TableHeader(canvas,x, y,150,30,'Table Name');
        this.children.push(tableNameBox);
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            if(this.isReRender){
                this.render();
            }
            ctx.fillStyle = "white";
            ctx.fill(this.path2D);
            ctx.strokeStyle = this.color;
            ctx.stroke(this.path2D);
        }
        super.draw();
    }


    rightClick(context: EventContext): boolean {
        ContextAPI.openContextMenu(context,'table');
        return false;
    }

    unHover(context : EventContext){
        this.canvas.style.cursor = "";
        super.unHover(context);
    }
    hover(context : EventContext){
        this.canvas.style.cursor = "move";
        return false;
    }

    mouseDown(context: EventContext): boolean {
        putMovement(this);
        return false;
    }

    newColumn(){
        const columnName = "new Column"+this.columnList.length
        this.columnList.push(columnName);
        const columnBox = new Column(this.canvas,this.x+1, this.y + ((this.columnList.length * 31)),148,30,columnName);
        this.children.push(columnBox);
        if(this.columnList.length>=2){
            this.h = (this.columnList.length * 31) + 30
            this.isReRender = true;
        }
    }
    deleteColumn(column : Column){
        this.columnList.splice(this.columnList.findIndex(elem=>elem==column.text),1)
        this.children.splice(this.children.findIndex(elem=>elem==column),1)
        this.columnAlign();
        if(this.columnList.length>=2){
            this.h = (this.columnList.length * 31) + 30
            this.isReRender = true;
        }
    }

    columnAlign(){
        let cnt = 0;
        this.children.forEach(child=>{
            if(child instanceof Column){
                cnt++;
                child.moveTo(this.x+1,this.y+ (cnt * 31));
                child.isReRender = true;
            }
        });
    }

}

