import CVElement from "./CVElement";
import MouseObject from "./MouseObject";
import TableAPI from "./api/TableAPI";

export default class ErdCv {
    canvas : HTMLCanvasElement;
    mouseObject : MouseObject;
    cvElementList : CVElement[] = [];
    ctx : CanvasRenderingContext2D;

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
        canvas.style.background = 'rgba(251, 246, 239,0.5)';
        this.ctx = canvas.getContext("2d")!;
        this.mouseObject = new MouseObject(this,canvas, this.cvElementList);
        TableAPI.setErdCv(this);
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }
    
    private drawFrame(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.cvElementList.forEach(ele=>{
            ele.draw(this.ctx);
        });
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }

    plusScale(){
        this.ctx.scale(0.9,0.9);
    }
    minusScale(){
        this.ctx.scale(1.1,1.1);
    }
    movement(x:number,y:number){
        this.ctx.translate(x,y);
    }
    
    addElement(elem : CVElement){
        this.cvElementList.push(elem);
    }

    deleteElement(target : CVElement){
        this.cvElementList.splice(this.cvElementList.findIndex(elem=>elem==target),1)
    }

    getElementList(){
        return this.cvElementList;
    }

}