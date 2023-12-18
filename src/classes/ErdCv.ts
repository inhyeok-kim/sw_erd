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
        this.mouseObject = new MouseObject(canvas, this.cvElementList);
        TableAPI.setErdCv(this);
        window.requestAnimationFrame(this.drawFrame.bind(this));
    }

    private drawFrame(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cvElementList.forEach(ele=>{
            ele.draw();
        });
        window.requestAnimationFrame(this.drawFrame.bind(this));
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