import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import TableManager from "./TableManager";
import ContextMenuManager from "./ContextMenuManager";

export default class ErdCv {
    stage : Stage;
    layer : Layer;

    tableManager : TableManager;
    contextMenuManager : ContextMenuManager;

    constructor(stage: Stage){
        this.stage = stage;
        
        const layer = new Konva.Layer();
        this.layer = layer;
        this.stage.add(layer);

        const scaleBy = 1.1;
        stage.on('wheel', (e) => {
            // stop default scrolling
            e.evt.preventDefault();
    
            var oldScale = stage.scaleX();
            var pointer = stage.getPointerPosition();
    
            var mousePointTo = {
              x: (pointer!.x - stage.x()) / oldScale,
              y: (pointer!.y - stage.y()) / oldScale,
            };
    
            // how to scale? Zoom in? Or zoom out?
            let direction = e.evt.deltaY < 0 ? 1 : -1;
    
            // when we zoom on trackpad, e.evt.ctrlKey is true
            // in that case lets revert direction
            if (e.evt.ctrlKey) {
              direction = -direction;
            }
    
            var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            
    
            stage.scale({ x: newScale, y: newScale });
    
            var newPos = {
              x: pointer!.x - mousePointTo.x * newScale,
              y: pointer!.y - mousePointTo.y * newScale,
            };
            stage.position(newPos);
        });

        stage.on("mousedown",(e)=>{
            if (e.target === stage) {
                this.stage.container().style.cursor = 'move';
            }
        });
        stage.on("mouseup",(e)=>{
            if (e.target === stage) {
                this.stage.container().style.cursor = 'default';
            }
        })


        this.tableManager = new TableManager(this.stage, this.layer);
        this.contextMenuManager = new ContextMenuManager(this.stage,this.layer);

        
    }

    resetScale(){
        this.stage.scale({x:1,y:1});
    }
    
}