import Konva from "konva";
import { GroupConfig } from "konva/lib/Group";

export default class Box extends Konva.Group{
    wrapper : Konva.Rect;

    constructor(config:GroupConfig){
        super(config);

        const wrapper = new Konva.Rect(config);

        this.wrapper = wrapper;
        
        this.add(wrapper);
    }
    

}