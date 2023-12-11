import CVElement from "./CVElement"
import Rect from "./elements/Rect";

export default class MouseObject {
    x:number = 0;
    y:number = 0;
    isDown : boolean = false;
    clickTarget : null | CVElement = null;
    downTarget : null | CVElement = null;
    hoverTarget : null | CVElement = null;
    downTargetGapX : number = 0;
    downTargetGapY : number = 0;
    canvas : HTMLCanvasElement;
    cvElementList : CVElement[];
    ctx : CanvasRenderingContext2D;

    constructor(canvas : HTMLCanvasElement, cvElementList : CVElement[]){
        this.canvas = canvas;
        this.cvElementList = cvElementList;
        this.ctx = canvas.getContext("2d")!;
        canvas.addEventListener("mousemove",this.onMouseMoveHandler.bind(this));

        canvas.addEventListener("click",this.onMouseClickHandler.bind(this));
        
        canvas.addEventListener("mousedown",this.onMouseDownHandler.bind(this));

        canvas.addEventListener("mouseup",this.onMouseUpHandler.bind(this));
    }

    private onMouseMoveHandler(e : MouseEvent){
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.hoverElementOnMouseMove();
        this.moveElementOnMouseMove(e);
    }

    private onMouseClickHandler(e : MouseEvent){
        if(this.hoverTarget){
            this.clickTarget = this.hoverTarget;
            (this.hoverTarget as CVElement).click(this.x, this.y);
        } else {
            this.clickTarget = null;
        }
    }

    private onMouseDownHandler(e : MouseEvent){
        this.isDown = true;
        if(this.hoverTarget){
            this.downTarget = this.hoverTarget;
            this.downTargetGapX = e.offsetX - (this.hoverTarget as CVElement).x;
            this.downTargetGapY = e.offsetY - (this.hoverTarget as CVElement).y;
        } else {
            this.downTarget = null;
        }
    }

    private onMouseUpHandler(e : MouseEvent){
        this.isDown = false;
        this.downTarget = null;
    }

    moveElementOnMouseMove(e:MouseEvent){
        if(this.isDown && this.downTarget){
            // (this.downTarget as CVElement).move(this.downTargetGapX,this.downTargetGapY);
            (this.downTarget as CVElement).move(e.movementX,e.movementY);
        }
    }
    hoverElementOnMouseMove(){
        if(!this.downTarget){
            let hoverFlag = false;
            for(let i=this.cvElementList.length-1; i >= 0; i--){
                const ele = this.cvElementList[i];
                if(!hoverFlag){
                const isPointInPath = this.ctx.isPointInPath(ele.path2D,this.x, this.y);
                    if(isPointInPath){
                        ele.hover(true);
                        hoverFlag = true;
                        this.hoverTarget = ele;
                    } else {
                        ele.hover(false);
                    }
                } else {
                    ele.hover(false);
                }
            }
            if(!hoverFlag) this.hoverTarget = null;
        }
    }
    

}