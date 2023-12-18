import CVElement from "./CVElement"
import { moveAll, resetMovement } from "./Movement";
import ContextAPI from "./api/ContextAPI";
import ContextMenu, { ContextMode } from "./elements/ContextMenu";

export default class MouseObject {
    canvas : HTMLCanvasElement;
    cvElementList : CVElement[];
    ctx : CanvasRenderingContext2D;
    isDown : boolean = false;
    isContextMenu : boolean = false;
    contextElement? : ContextMenu;
    hoverContext : EventContext = {
        targetList : [],
        lastTarget : undefined,
        firstTarget : undefined,
        isCapturing : false,
        event : undefined
    };
    clickContext : EventContext = {
        targetList : [],
        lastTarget : undefined,
        firstTarget : undefined,
        isCapturing : false,
        event : undefined
    };
    rightClickContext : EventContext = {
        targetList : [],
        lastTarget : undefined,
        firstTarget : undefined,
        isCapturing : false,
        event : undefined
    };
    downContext : EventContext = {
        targetList : [],
        lastTarget : undefined,
        firstTarget : undefined,
        isCapturing : false,
        event : undefined
    };
    upContext : EventContext = {
        targetList : [],
        lastTarget : undefined,
        firstTarget : undefined,
        isCapturing : false,
        event : undefined
    };

    constructor(canvas : HTMLCanvasElement, cvElementList : CVElement[]){
        ContextAPI.setMouseObject(this);
        this.canvas = canvas;
        this.cvElementList = cvElementList;
        this.ctx = canvas.getContext("2d")!;
        canvas.addEventListener("mousemove",this.onMouseMoveHandler.bind(this));

        canvas.addEventListener("click",this.onMouseClickHandler.bind(this));

        canvas.addEventListener("contextmenu",this.onMouseRightClickHandler.bind(this));
        
        canvas.addEventListener("mousedown",this.onMouseDownHandler.bind(this));

        canvas.addEventListener("mouseup",this.onMouseUpHandler.bind(this));
        canvas.addEventListener("mouseleave",this.onMouseLeaveHandler.bind(this))
    }

    private onMouseLeaveHandler(e : MouseEvent){
        resetMovement();
    }

    private onMouseMoveHandler(e : MouseEvent){
        this.hoverContext.event = e;
        this.emitHoverOnElement(e);
        this.moveElementOnMouseMove(e);
    }

    openContextMenu(e : EventContext,mode : ContextMode){
        if(this.isContextMenu){
            this.cvElementList.pop();
        }
        this.isContextMenu = true;
        this.contextElement = new ContextMenu(this.canvas,e.event!.offsetX,e.event!.offsetY,e,mode);
        this.cvElementList.push(this.contextElement);
    }

    closeContextMenu(){
        this.isContextMenu = false;
        this.cvElementList.pop();
        this.contextElement = undefined;
    }

    setContextMode(mode : ContextMode){
        this.contextElement!.mode = mode;
    }

    private onMouseRightClickHandler(e : MouseEvent){
        e.preventDefault();
        this.rightClickContext.event = e;
        this.rightClickContext.isCapturing = false;
        if(this.hoverContext.targetList.length > 0){
            this.rightClickContext.targetList = [...this.hoverContext.targetList];
            this.rightClickContext.firstTarget = this.rightClickContext.targetList[0];
            this.rightClickContext.lastTarget = this.rightClickContext.targetList[this.rightClickContext.targetList.length-1];
            this.rightClickContext.targetList.forEach((ele,i)=>{
                if(i>0){
                    if(!this.rightClickContext.isCapturing) return;
                }
                const isCapturing = ele.rightClick(this.rightClickContext);
                this.rightClickContext.isCapturing = isCapturing;

            });
        } else {
            this.rightClickContext.targetList = [];
            this.rightClickContext.lastTarget = undefined;
            this.rightClickContext.firstTarget = undefined;
            this.openContextMenu(this.rightClickContext,'ground');
        }
    }
    private onMouseClickHandler(e : MouseEvent){
        this.clickContext.event = e;
        this.clickContext.isCapturing = false;
        if(this.hoverContext.targetList.length > 0){
            this.clickContext.targetList = [...this.hoverContext.targetList];
            this.clickContext.firstTarget = this.clickContext.targetList[0];
            this.clickContext.lastTarget = this.clickContext.targetList[this.clickContext.targetList.length-1];
            this.clickContext.targetList.forEach((ele,i)=>{
                if(i>0){
                    if(!this.clickContext.isCapturing) return;
                }
                const isCapturing = ele.click(this.clickContext);
                this.clickContext.isCapturing = isCapturing;

            });
        }
    }

    private onMouseDownHandler(e : MouseEvent){
        if(e.button !== 2){
            this.isDown = true;
            this.downContext.event = e;
            this.downContext.isCapturing = false;
            if(this.isContextMenu){
                if(this.hoverContext.targetList.length === 0 || !this.hoverContext.targetList.find(v=>v===this.contextElement)){
                    this.closeContextMenu();
                }
            }   

            if(this.hoverContext.targetList.length > 0){
                
                this.downContext.targetList = [...this.hoverContext.targetList];
                this.downContext.firstTarget = this.downContext.targetList[0];
                this.downContext.lastTarget = this.downContext.targetList[this.downContext.targetList.length-1];
                

                const targetIdx = this.cvElementList.findIndex(v=>v===this.downContext.lastTarget);
                this.cvElementList.splice(targetIdx,1);
                this.cvElementList.push(this.downContext.lastTarget);
    
                this.downContext.targetList.forEach((ele,i)=>{
                    if(i>0){
                        if(!this.downContext.isCapturing) return;
                    }
                    const isCapturing = ele.mouseDown(this.downContext);
                    this.downContext.isCapturing = isCapturing;
                });
            }
        }
    }

    private onMouseUpHandler(e : MouseEvent){
        resetMovement();
        this.isDown = false;
        this.upContext.event = e;
        this.upContext.isCapturing = false;
        if(this.hoverContext.targetList.length > 0){
            this.upContext.targetList = [...this.hoverContext.targetList];
            this.upContext.firstTarget = this.upContext.targetList[0];
            this.upContext.lastTarget = this.upContext.targetList[this.upContext.targetList.length-1];
            this.upContext.targetList.forEach((ele,i)=>{
                if(i>0){
                    if(!this.upContext.isCapturing) return;
                }
                const isCapturing = ele.mouseUp(this.upContext);
                this.upContext.isCapturing = isCapturing;
            });
        }
    }

    private moveElementOnMouseMove(e:MouseEvent){
        if(this.isDown){
            moveAll(e.movementX, e.movementY);
        }
    }
    private emitHoverOnElement(e : MouseEvent){
        const hoverList : CVElement[] = []
        this.hoveringChecker(this.cvElementList,hoverList,e.offsetX, e.offsetY);
        if(hoverList.length > 0){
            this.hoverContext.targetList = hoverList.reverse();
            this.hoverContext.firstTarget = this.hoverContext.targetList[0];
            this.hoverContext.lastTarget = this.hoverContext.targetList[this.hoverContext.targetList.length-1];
            hoverList.forEach((ele,i)=>{
                if(i>0){
                    if(!this.hoverContext.isCapturing) return;
                }
                const isCapturing = ele.hover(this.hoverContext);
                this.hoverContext.isCapturing = isCapturing;
            });
        } else {
            this.hoverContext.targetList = [];
            this.hoverContext.firstTarget = undefined;
            this.hoverContext.lastTarget = undefined;
            
        }
    }

    private hoveringChecker(checklist:CVElement[], result : CVElement[], x:number, y:number){
        let hoverFlag = false;
        for(let i=checklist.length-1; i >= 0; i--){
            const ele = checklist[i];
            if(!hoverFlag){
                const isPointInPath = this.ctx.isPointInPath(ele.path2D,x, y);
                if(isPointInPath){
                    result.push(ele);
                    if(ele.children.length > 0){
                        this.hoveringChecker(ele.children,result,x,y);
                    }
                    hoverFlag = true;
                } else {
                    ele.unHover(this.hoverContext);
                }
            } else {
                ele.unHover(this.hoverContext);
            }
        }
    }

}

export interface EventContext {
    targetList : CVElement[]
    lastTarget : CVElement | undefined
    firstTarget : CVElement  | undefined
    isCapturing : boolean
    event : MouseEvent | undefined
}


