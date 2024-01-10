import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import ErdCv from "./ErdCv";
import Table from "./elements/Table";
import TableDataset from "./dataset/TableDataset";

export default class TableManager {
    erd : ErdCv;
    stage : Stage;
    layer : Layer;

    constructor(erd : ErdCv, stage: Stage, layer : Layer){
        this.erd = erd;
        this.stage = stage;
        this.layer = layer;
    }

    addTable(x:number,y:number){
        this.layer.add(new Table(x,y));
    }

    createTable(table:TableDataset){
        
    }
    
}