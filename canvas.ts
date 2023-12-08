const cv = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = cv.getContext("2d")!;
let elements : CVElement[] = [];

function oderElements(){
    elements = elements.sort((a,b)=>{
        return a.z - b.z
    });
}

const MOUSE_OBJECT = {
    x : 0,
    y : 0,
    isDown : false,
    clickTarget : null,
    downTarget : null,
    hoverTarget : null,
    downTargetGapX : 0,
    downTargetGapY : 0,
} as {
    x:number
    y:number
    isDown : boolean
    clickTarget : null | CVElement,
    downTarget : null | CVElement,
    hoverTarget : null | CVElement,
    downTargetGapX : number,
    downTargetGapY : number,
};

class CVElement {
    x : number;
    y : number;
    w : number;
    h : number;
    z : number;
    path2D : Path2D;
    isHover : boolean = false;
    isReRender : boolean = true;

    constructor(x : number,y : number,w:number,h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.z = 0;
        this.path2D = new Path2D();
    }

    draw(){
    }

    click(){
    }

    hover(_isHover : boolean){
    }

    move(x:number, y:number){
        this.x = x;
        this.y = y;
        this.isReRender = true;
    }
}

class Rect extends CVElement{
    color : string = "red";

    constructor(x : number,y : number,w:number,h:number){
        super(x,y,w,h);
        this.path2D.rect(this.x,this.y,this.w,this.h);
    }

    draw(){
        if(this.isReRender){
            this.path2D = new Path2D();
            this.path2D.rect(this.x,this.y,this.w,this.h);
            this.isReRender = false;
        }
        ctx.fillStyle = this.color;
        ctx.fill(this.path2D);
    }

    click(){
        this.z = this.z === 3 ? this.z = 0 : this.z+1;
        oderElements();
        this.isReRender = true;
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

const rect1 = new Rect(25,25,100,100);
elements.push(rect1);
const rect2 = new Rect(150,150,100,100);
elements.push(rect2);
const rect3 = new Rect(250,300,100,100);
elements.push(rect3);

cv.addEventListener("mousemove",function(e : MouseEvent){
    MOUSE_OBJECT.x = e.offsetX;
    MOUSE_OBJECT.y = e.offsetY;
    hoverElementOnMouseMove();
    moveElementOnMouseMove();
});

function moveElementOnMouseMove(){
    if(MOUSE_OBJECT.isDown && MOUSE_OBJECT.downTarget){
        (MOUSE_OBJECT.downTarget as Rect).move(MOUSE_OBJECT.x - MOUSE_OBJECT.downTargetGapX,MOUSE_OBJECT.y - MOUSE_OBJECT.downTargetGapY);
    }
}
function hoverElementOnMouseMove(){
    if(!MOUSE_OBJECT.downTarget){
        let hoverFlag = false;
        for(let i=elements.length-1; i >= 0; i--){
            const ele = elements[i];
            const isPointInPath = ctx.isPointInPath(ele.path2D,MOUSE_OBJECT.x, MOUSE_OBJECT.y);
            if(isPointInPath){
                if(hoverFlag){
                    ele.hover(false);
                } else {
                    ele.hover(true);
                    hoverFlag = true;
                    MOUSE_OBJECT.hoverTarget = ele;
                }
            } else {
                ele.hover(false);
            }
        }
        if(!hoverFlag) MOUSE_OBJECT.hoverTarget = null;
    }
}

cv.addEventListener("click",function(e : MouseEvent){
    if(MOUSE_OBJECT.hoverTarget){
        MOUSE_OBJECT.clickTarget = MOUSE_OBJECT.hoverTarget;
        (MOUSE_OBJECT.hoverTarget as Rect).click()
    } else {
        MOUSE_OBJECT.clickTarget = null;
    }
});

cv.addEventListener("mousedown",function(e : MouseEvent){
    MOUSE_OBJECT.isDown = true;
    if(MOUSE_OBJECT.hoverTarget){
        MOUSE_OBJECT.downTarget = MOUSE_OBJECT.hoverTarget;
        MOUSE_OBJECT.downTargetGapX = e.offsetX - (MOUSE_OBJECT.hoverTarget as Rect).x;
        MOUSE_OBJECT.downTargetGapY = e.offsetY - (MOUSE_OBJECT.hoverTarget as Rect).y;
    } else {
        MOUSE_OBJECT.downTarget = null;
    }
});
cv.addEventListener("mouseup",function(e : MouseEvent){
    MOUSE_OBJECT.isDown = false;
    MOUSE_OBJECT.downTarget = null;
});

function drawFrame(){
    ctx.clearRect(0, 0, cv.width, cv.height);
    elements.forEach(ele=>{
        ele.draw();
    });
    window.requestAnimationFrame(drawFrame);
}

window.requestAnimationFrame(drawFrame);