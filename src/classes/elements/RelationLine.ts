import CVElement from "../CVElement";

export default class RelationLine extends CVElement{
    color : string = "black";
    isFill : boolean = false;
    start : CVElement;
    end : CVElement;

    constructor(canvas : HTMLCanvasElement,start : CVElement, end : CVElement){
        super(canvas,0,0,0,0);
        this.start = start;
        this.end = end;
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.moveTo(this.start.x,this.start.y);
        this.path2D.lineTo(this.end.x,this.end.y);
        this.isReRender = false;
    }

    draw(ctx : CanvasRenderingContext2D){
        if(ctx){
            if(this.isReRender){
                this.render();
            }
            ctx.strokeStyle = this.color;
            ctx.stroke(this.path2D);
        }
        super.draw(ctx);
    }

}

