import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { Shape } from "konva/lib/Shape";
import { Stage } from "konva/lib/Stage";
import Button from "./elements/Button";

export default class ContextMenuManager {
    stage : Stage;
    layer : Layer;
    target : null | Stage | Shape | Group = null;
    contextShape : Shape | null | Group = null;

    constructor(stage: Stage, layer : Layer){
        this.stage = stage;
        this.layer = layer;

        stage.on("mousedown",()=>{
            if(this.contextShape){
                this.closeContextMenu();
            }
        })
        stage.on("contextmenu", (e)=>{
            e.evt.preventDefault();
            if(this.contextShape){
                this.closeContextMenu();
            }

            this.target = e.target;
            if (e.target === stage) {
                this.contextShape = this.openContextMenu(stage.getRelativePointerPosition()!.x, stage.getRelativePointerPosition()!.y)
                window.addEventListener("click",this.closeContextMenu.bind(this),{once : true});
            }
        });
    }
    closeContextMenu(){
        this.contextShape?.destroy();
        this.contextShape = null;
    }
    openContextMenu(x:number,y:number){
        const group = new Konva.Group({
            x: x,
            y: y,
            draggable : false,
            scale : {x:1/this.stage.scaleX(),y:1/this.stage.scaleY()},
        })
        const body = new Konva.Rect({
            x : 0,
            y : 0,
            width: 120,
            height: 50,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
        });
        group.add(body);

        const button1 = new Button(0,0,"New Table");
        button1.on("mouseover",()=>{
            button1.fill("#f7f7f7");
            this.stage.container().style.cursor = 'pointer';
        });
        button1.on("mouseleave",()=>{
            button1.fill("white");
            this.stage.container().style.cursor = 'default';
        });
        group.add(button1);

        this.layer.add(group);
        return group;
    }
    
}