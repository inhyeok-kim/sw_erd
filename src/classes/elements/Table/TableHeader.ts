import Konva from "konva";
import PencilIcon from "../icons/pencil";
import Table from ".";

export default class TableHeader extends Konva.Group{
    table : Table;
    wrapper : Konva.Rect;
    tableName : string;
    headerText : Konva.Text;

    constructor(table: Table){
        super({
            x:0,
            y:0,
        });
        this.table = table;
        this.tableName = table.tableName;

        const wrapper = new Konva.Rect({
            x : 0,
            y : 0,
            width: 120,
            height: 30,
            fill : 'white',
        });
        this.wrapper = wrapper;
        this.add(wrapper);
        
        const tableHeaderText = new Konva.Text({
            x : 10,
            y : 0,
            width: 100,
            height: 30,
            fill : "black",
            text : this.tableName,
            verticalAlign : 'middle'
        })
        tableHeaderText.on("dblclick",(e)=>{
            this.openInputText();
        });
        this.headerText = tableHeaderText;
        this.add(tableHeaderText);

        if(tableHeaderText.measureSize(this.tableName).width > 100) {
            const newWidth = tableHeaderText.measureSize(this.tableName).width;
            tableHeaderText.width(newWidth);
            wrapper.width(newWidth+20);
        } else {
            const newWidth = tableHeaderText.measureSize(this.tableName).width;
            tableHeaderText.width(newWidth);
        }

        tableHeaderText.on("mouseover",()=>{
            this.getStage()!.container().style.cursor = 'text';
        });
        tableHeaderText.on("mouseleave",()=>{
            this.getStage()!.container().style.cursor = 'default';
        });
    }

    openInputText(){
        const position = {
            x : this.getStage()!.container().offsetLeft + this.headerText.getAbsolutePosition().x+1,
            y : this.getStage()!.container().offsetTop + this.headerText.getAbsolutePosition().y+1,
        }

        const scale = this.getStage()!.scale()!.x;

        const input = document.createElement("input");
        input.value = this.tableName;

        input.style.transform="scale("+scale+")";
        input.style.transformOrigin="top left";
        input.style.padding = '0px';
        input.style.fontSize = '12px';
        // input.style.height= (this.headerText.height()-2)+ "px";
        input.style.width= this.headerText.width()+"px";
        input.style.outline = "none";
        // input.style.border="none";
        input.style.position = "absolute";
        input.style.top = (position.y+(5*scale))+"px";
        input.style.left = (position.x-(1*scale))+"px";
        document.body.append(input);

        window.addEventListener("wheel",()=>{
            input.blur();
        },{once:true});

        input.addEventListener("blur",(e)=>{
            input.remove();
        },{once : true});

        input.addEventListener("input",(e)=>{
            this.setName(e.currentTarget!.value);
            input.style.width= this.headerText.width()+"px";
        });
        input.focus();
    }

    getName(){
        return this.tableName;
    }
    setName(v:string){
        this.tableName = v;
        this.headerText.text(v);
        this.resize();
    }
    resize(){
        if(this.headerText.measureSize(this.tableName).width > 100) {
            const newWidth = this.headerText.measureSize(this.tableName).width;
            this.headerText.width(newWidth);
            this.wrapper.width(newWidth+20);
            this.table.wrapper.width(newWidth+20);
        } else {
            const newWidth = this.headerText.measureSize(this.tableName).width;
            this.headerText.width(newWidth);
        }
    }

}