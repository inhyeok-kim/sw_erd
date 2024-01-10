import Konva from "konva";

export default class Button extends Konva.Group{
    wrapperShape : Konva.Rect;
    textShape : Konva.Text;

    constructor(x:number, y:number,text : string){
        super({
            x:x,
            y:y,
        });

        const wrapper = new Konva.Rect({
            x : 0,
            y : 0,
            width: 120,
            height: 25,
            fill: 'white',
        });
        this.wrapperShape = wrapper;
        
        const textShape = new Konva.Text({
            x:5,
            y:0,
            width : 110,
            height : 25,
            text : 'Create New Table',
            verticalAlign : 'middle',
        });
        this.textShape = textShape;
        
        this.add(wrapper);
        this.add(textShape);
    }

    fill(color? : string){
        if(!color){
            return this.wrapperShape.fill();
        }
        this.wrapperShape.fill(color);
    }
    stroke(color? : string){
        if(!color){
            return this.wrapperShape.stroke();
        }
        this.wrapperShape.stroke(color);
    }
    fontColor(color? : string){
        if(!color){
            return this.textShape.fill();
        }
        this.textShape.fill(color);
    }
    text(text? : string){
        if(text === undefined){
            return this.textShape.text();
        }
        this.textShape.text(text);
    }

}