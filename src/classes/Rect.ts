import CVElement from "./CVElement";

export default class Rect extends CVElement{
    color : string = "red";

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number){
        super(canvas,x,y,w,h);
        this.path2D.rect(this.x,this.y,this.w,this.h);
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            if(this.isReRender){
                this.path2D = new Path2D();
                this.path2D.rect(this.x,this.y,this.w,this.h);
                this.isReRender = false;
            }
            ctx.fillStyle = this.color;
            ctx.fill(this.path2D);
        }
    }

    click(){
        // this.z = this.z === 3 ? this.z = 0 : this.z+1;
        // oderElements();
        // this.isReRender = true;
    }

    hover(_isHover : boolean){
        if(this.isHover != _isHover){
            this.isHover = _isHover;
            if(_isHover){
                this.color = 'green';
            } else {
                this.color = 'red'
            }
            this.isReRender = true;
        }
    }

}

