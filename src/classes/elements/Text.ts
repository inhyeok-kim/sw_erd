import CVElement from "../CVElement";
import { EventContext } from "../MouseObject";

export default class Text extends CVElement{
    color : string = "white";
    text : string
    isEditable : boolean = false;
    fontSize : number = 15;
    fontColor : string = "black"
    textWidth : number = 0;
    fontWeight : string =''
    inputElement : HTMLInputElement|undefined

    constructor(canvas : HTMLCanvasElement,x : number,y : number,text : string){
        super(canvas,x,y,0,0);
        this.text = text;
    }

    render(){
        this.path2D = new Path2D();
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            ctx.textBaseline = 'top';
            ctx.font = `${this.fontWeight} ${this.fontSize}px Arial`
            this.textWidth = ctx.measureText(this.text).width;
            this.w = this.textWidth;
            this.h = this.fontSize-2;
            this.path2D.rect(this.x,this.y,this.w,this.h);
            this.isReRender = false;
            if(this.inputElement){
                this.inputElement.style.width = this.w +'px';
            }
        }
    }

    draw(ctx : CanvasRenderingContext2D){
        if(ctx){
            if(this.isReRender){
                this.render();
            }
            ctx.strokeStyle = this.color;
            ctx.stroke(this.path2D);
            ctx.textBaseline = 'top';
            ctx.font = `${this.fontWeight} ${this.fontSize}px Arial`
            ctx.fillStyle = this.fontColor;
            ctx.fillText(this.text, this.x, this.y);
        }
        super.draw(ctx);
    }

    click(context : EventContext) : boolean{
        if(this.isEditable){
            const input = document.createElement('input');
            const cvy = this.canvas.offsetTop;
            const cvx = this.canvas.offsetLeft;
            input.style.position = "fixed";
            input.style.top = (cvy +this.y + ((this.h - this.fontSize)/2)-2)+"px";
            input.style.left = (cvx +this.x) + "px";
            input.style.width = (this.w) + 'px';
            input.style.height = (this.fontSize) + 'px';
            input.style.margin = '0px';
            input.style.paddingLeft = '0px';
            input.value = this.text;
            input.style.fontSize = (this.fontSize-1) +'px';
            input.style.outline = "none";
            input.addEventListener("focusout",this.focusOut.bind(this));
            input.addEventListener("input",this.onInput.bind(this));
            input.addEventListener("keydown",this.onKeydown.bind(this));
            document.body.append(input);
            input.focus();
            this.inputElement = input;
        }
        return false;
    }

    private focusOut(e:FocusEvent){
        this.text = e.currentTarget!.value;                
        e.currentTarget!.remove();
        this.isReRender = true;
    }
    private onInput(e:Event){
        this.text = e.currentTarget!.value;                
        this.isReRender = true;
    }
    private onKeydown(e:KeyboardEvent){
        if(e.key === 'Enter'){
            (e.currentTarget! as HTMLInputElement).blur();
        }
    }

    unHover(context : EventContext){
        this.canvas.style.cursor = "";
        super.unHover(context);
    }
    hover(context : EventContext){
        this.canvas.style.cursor = "text";
        return false;
    }

}

