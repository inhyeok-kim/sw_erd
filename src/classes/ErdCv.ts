import CVElement from "./CVElement";
import MouseObject from "./MouseObject";

export default class ErdCv {
    canvas : HTMLCanvasElement;
    mouseObject : MouseObject;
    cvElementList : CVElement[] = [];
    ctx : CanvasRenderingContext2D;

    constructor(canvas : HTMLCanvasElement){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.mouseObject = new MouseObject(canvas, this.cvElementList);
        
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

}