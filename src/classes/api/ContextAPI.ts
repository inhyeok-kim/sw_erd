import MouseObject, { EventContext } from "../MouseObject";
import { ContextMode } from "../elements/ContextMenu";

export default class ContextAPI {
    private static mouseObject : MouseObject | null = null;

    static setMouseObject(mouseObject : MouseObject){
        this.mouseObject = mouseObject;
    }

    static openContextMenu(e : EventContext,mode : ContextMode){
        this.mouseObject?.openContextMenu(e,mode);
    }

    static setMode(mode : ContextMode){
        this.mouseObject!.setContextMode(mode);
    }

    static closeContextMenu(){
        this.mouseObject?.closeContextMenu();
    }
}
