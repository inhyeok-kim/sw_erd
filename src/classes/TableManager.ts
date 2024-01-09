import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";

export default class TableManager {
    stage : Stage;
    layer : Layer;

    constructor(stage: Stage, layer : Layer){
        this.stage = stage;
        this.layer = layer;
        this.addTable();
    }

    addTable(){
        const rect = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable : true
        });
        this.layer.add(rect);
    }
    
}