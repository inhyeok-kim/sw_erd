import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";
import ContextAPI from "../api/ContextAPI";
import TableAPI from "../api/TableAPI";
import RectButton from "./RectButton";

export default class ContextMenu extends CVElement{
    color : string = "black";
    isFill : boolean = false;

    constructor(canvas : HTMLCanvasElement,x : number,y : number){
        super(canvas,x,y,100,30);
        const newTableBtn = new RectButton(canvas,x+1,y+5,98,20,"New Table");
        newTableBtn.onClick = this.fnNewTable.bind(this);
        this.children.push(newTableBtn);
    }

    fnNewTable(context : EventContext){
        ContextAPI.closeContextMenu();
        TableAPI.addTableApi(this.x, this.y);
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

    click(){
        // this.z = this.z === 3 ? this.z = 0 : this.z+1;
        // oderElements();
        // this.isReRender = true;
    }


}

