import CVElement from "../CVElement";

export default class Text extends CVElement{
    color : string = "black";
    isFill : boolean = false;
    text : string
    isEditable : boolean = false;

    constructor(canvas : HTMLCanvasElement,x : number,y : number,w:number,h:number,text : string){
        super(canvas,x,y,w,h);
        this.text = text;
        this.isEditable = true;
    }

    render(){
        this.path2D = new Path2D();
        this.path2D.rect(this.x,this.y,this.w,this.h);
        this.isReRender = false;
    }

    draw(){
        const ctx = this.canvas.getContext("2d");
        if(ctx){
            if(this.isReRender){
                this.render();
            }
            ctx.font = "10px";
            if(this.isFill){
                ctx.fillStyle = this.color;
                ctx.fillText(this.text, this.x, this.y+10);
                ctx.fillStyle = this.color;
                ctx.fill(this.path2D);
            } else {
                ctx.strokeStyle = this.color;
                ctx.stroke(this.path2D);
                ctx.strokeStyle = this.color;
                ctx.strokeText(this.text,this.x, this.y+10);
            }
        }
    }

    click(x:number, y:number){
        if(this.isEditable){
            const input = document.createElement('input');
            const cvy = this.canvas.offsetTop;
            const cvx = this.canvas.offsetLeft;
            input.style.position = "fixed";
            input.style.top = (cvy +this.y)+"px";
            input.style.left = (cvx +this.x) + "px";
            input.style.width = "80px";
            input.style.height = "10px";
            input.value = this.text;
            input.style.fontSize = '10px';
            document.querySelector(".App")!.append(input);
            input.focus();
            input.addEventListener("focusout",this.focusOut.bind(this));
        }
    }

    private focusOut(e:FocusEvent){
        this.text = e.currentTarget!.value;                
        e.currentTarget!.remove();
    }

    hover(_isHover : boolean){
        if(this.isHover !== _isHover){
            this.isHover = _isHover;
            if(_isHover){
                this.color = 'red';
            } else {
                this.color = 'black'
            }
            this.isReRender = true;
        }
    }

}

