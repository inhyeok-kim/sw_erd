import { setState } from "../GlobalState";
import CVElement from "./CVElement"

export default class MouseObject {
    canvas : HTMLCanvasElement;
    cvElementList : CVElement[];
    ctx : CanvasRenderingContext2D;

    eventContext : EventContext = {
        x : 0,
        y : 0,
        isContext : false,
        isDown  : false,
        clickTarget : null,
        downTarget  : null,
        hoverTarget : null,
        downTargetGapX  : 0,
        downTargetGapY  : 0,
    };

    constructor(canvas : HTMLCanvasElement, cvElementList : CVElement[]){
        this.canvas = canvas;
        this.cvElementList = cvElementList;
        this.ctx = canvas.getContext("2d")!;
        canvas.addEventListener("mousemove",this.onMouseMoveHandler.bind(this));

        canvas.addEventListener("click",this.onMouseClickHandler.bind(this));

        canvas.addEventListener("contextmenu",this.onMouseRightClickHandler.bind(this));
        
        canvas.addEventListener("mousedown",this.onMouseDownHandler.bind(this));

        canvas.addEventListener("mouseup",this.onMouseUpHandler.bind(this));
    }

    private onMouseMoveHandler(e : MouseEvent){
        this.eventContext.x = e.offsetX;
        this.eventContext.y = e.offsetY;
        this.emitHoverOnElement();
        this.moveElementOnMouseMove(e);
    }

    private onMouseRightClickHandler(e : MouseEvent){
        e.preventDefault();
        this.eventContext.isContext = true;
        setState("contextmenu",this.eventContext);
    }
    private onMouseClickHandler(e : MouseEvent){
        if(this.eventContext.hoverTarget){
            this.eventContext.clickTarget = this.eventContext.hoverTarget;
            (this.eventContext.hoverTarget as CVElement).click(this.eventContext.x, this.eventContext.y);
        } else {
            this.eventContext.clickTarget = null;
        }
    }

    private onMouseDownHandler(e : MouseEvent){
        this.eventContext.isDown = true;
        if(this.eventContext.hoverTarget){
            this.eventContext.downTarget = this.eventContext.hoverTarget;
            this.eventContext.downTargetGapX = e.offsetX - (this.eventContext.hoverTarget as CVElement).x;
            this.eventContext.downTargetGapY = e.offsetY - (this.eventContext.hoverTarget as CVElement).y;

            // go to upper
            const targetIdx = this.cvElementList.findIndex(v=>v===this.eventContext.downTarget);
            this.cvElementList.splice(targetIdx,1);
            this.cvElementList.push(this.eventContext.downTarget);

            this.eventContext.downTarget.mouseDown();
        } else {
            this.eventContext.downTarget = null;
        }
    }

    private onMouseUpHandler(e : MouseEvent){
        this.eventContext.isDown = false;
        this.eventContext.downTarget = null;
    }

    moveElementOnMouseMove(e:MouseEvent){
        if(this.eventContext.isDown && this.eventContext.downTarget){
            // (this.downTarget as CVElement).move(this.downTargetGapX,this.downTargetGapY);
            (this.eventContext.downTarget as CVElement).move(e.movementX,e.movementY);
        }
    }
    emitHoverOnElement(){
        if(!this.eventContext.downTarget){
            let hoverFlag = false;
            for(let i=this.cvElementList.length-1; i >= 0; i--){
                const ele = this.cvElementList[i];
                if(!hoverFlag){
                const isPointInPath = this.ctx.isPointInPath(ele.path2D,this.eventContext.x, this.eventContext.y);
                    if(isPointInPath){
                        ele.hover(this.eventContext);
                        hoverFlag = true;
                        this.eventContext.hoverTarget = ele;
                    } else {
                        ele.unHover(this.eventContext);
                    }
                } else {
                    ele.unHover(this.eventContext);
                }
            }
            if(!hoverFlag) this.eventContext.hoverTarget = null;
        }
    }
    

}

export interface EventContext {
    x:number
    y:number
    isContext : boolean
    isDown : boolean
    clickTarget : null | CVElement
    downTarget : null | CVElement
    hoverTarget : null | CVElement
    downTargetGapX : number
    downTargetGapY : number
}