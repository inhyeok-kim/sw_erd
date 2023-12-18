import Konva from "konva";
import { Stage } from "konva/lib/Stage";

export default class ErdCv {
    stage : Stage;

    constructor(stage: Stage){
        this.stage = stage;
        
        const layer = new Konva.Layer();
        const rect = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            fill: 'green',
            stroke: 'black',
            strokeWidth: 4,
            draggable : true
        });
        layer.add(rect);
        this.stage.add(layer);

        var anim = new Konva.Animation(function(frame) {
            var time = frame!.time,
                timeDiff = frame!.timeDiff,
                frameRate = frame!.frameRate;
            // update stuff
          }, layer);
        
        anim.start();
    }
    
}