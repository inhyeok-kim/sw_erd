import MouseObject from "../MouseObject";

export default class ContextAPI {
    private static mouseObject : MouseObject | null = null;

    static setMouseObject(mouseObject : MouseObject){
        this.mouseObject = mouseObject;
    }

    static closeContextMenu(){
        this.mouseObject?.closeContextMenu();
    }
}