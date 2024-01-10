import Konva from "konva";
import TableHeader from "./TableHeader";

export default class Table extends Konva.Group{
    wrapper : Konva.Rect;
    tableName : string;

    constructor(x:number, y:number, tableName? : string){
        super({
            x:x,
            y:y,
            draggable : true
        });
        this.tableName = tableName ? tableName : "New Table";

        const wrapper = new Konva.Rect({
            x : 0,
            y : 0,
            width: 120,
            height: 30,
            stroke : 'black',
        });

        this.wrapper = wrapper;
        this.add(wrapper);
        
        const tableHeader = new TableHeader(this);
        this.add(tableHeader);

        wrapper.width(tableHeader.wrapper.width());
    }

}