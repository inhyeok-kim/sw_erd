import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";
import ContextAPI from "../api/ContextAPI";
import TableAPI from "../api/TableAPI";
import RectButton from "./RectButton";
import Column from "./Table/Column";
import Table from "./Table/Table";

export default class ContextMenu extends CVElement{
    color : string = "rgba(255,255,255,0)";
    isFill : boolean = false;
    eventContext : EventContext;
    mode : ContextMode = 'ground';

    constructor(canvas : HTMLCanvasElement,x : number,y : number, eventContext : EventContext,mode : ContextMode){
        super(canvas,x,y,100,30);
        this.eventContext = eventContext;
        this.mode = mode;

        const newTableBtn = new RectButton(canvas,x+1,y+5,98,20,"New Table");
        newTableBtn.onClick = this.fnNewTable.bind(this);
        this.children.push(newTableBtn);

        
        if(this.mode === 'table'){
            this.h += 20;
            const newColumnBtn = new RectButton(canvas,x+1, (y+5) + (this.children.length * 20),98,20,"New Column");
            newColumnBtn.onClick = this.fnNewColumn.bind(this);
            this.children.push(newColumnBtn);

            this.h += 20;
            const deleteTableBtn = new RectButton(canvas,x+1, (y+5) + (this.children.length * 20),98,20,"Delete Table");
            deleteTableBtn.onClick = this.fnDeleteTable.bind(this);
            this.children.push(deleteTableBtn);
        }

        if(this.mode === 'column'){
            this.h += 20;
            const newColumnBtn = new RectButton(canvas,x+1, (y+5) + (this.children.length * 20),98,20,"New Column");
            newColumnBtn.onClick = this.fnNewColumn.bind(this);
            this.children.push(newColumnBtn);

            this.h += 20;
            const deleteColumnBtn = new RectButton(canvas,x+1, (y+5) + (this.children.length * 20),98,20,"Delete Column");
            deleteColumnBtn.onClick = this.fnDeleteColumn.bind(this);
            this.children.push(deleteColumnBtn);
        }
    }

    fnNewTable(context : EventContext){
        ContextAPI.closeContextMenu();
        TableAPI.addTableApi(this.x, this.y);
    }

    fnNewColumn(context : EventContext){
        this.eventContext.targetList.forEach(target=>{
            if(target instanceof Table){
                target.newColumn();
                ContextAPI.closeContextMenu();
                return false;
            }
        });
    }

    fnDeleteTable(context : EventContext){
        this.eventContext.targetList.forEach(target=>{
            if(target instanceof Table){
                TableAPI.deleteElementApi(target);
                ContextAPI.closeContextMenu();
                return false;
            }
        });
    }

    fnDeleteColumn(context : EventContext){
        let targetTable : Table, targetColumn :Column;
        this.eventContext.targetList.forEach(target=>{
            if(target instanceof Table){
                targetTable = target
            }
            if(target instanceof Column){
                targetColumn = target
            }
            if(targetTable && targetColumn){
                return;
            }
        });
        targetTable!.deleteColumn(targetColumn!);
        ContextAPI.closeContextMenu();
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    draw(ctx : CanvasRenderingContext2D){
        if(ctx){
            ctx.restore();
            if(this.isReRender){
                this.render();
            }
            ctx.fillStyle = "white";
            ctx.fill(this.path2D);
            ctx.strokeStyle = this.color;
            ctx.stroke(this.path2D);
            
        }
        super.draw(ctx);
    }


}

export type ContextMode = 'ground'|'table'|'column'