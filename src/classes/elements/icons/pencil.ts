import Konva from "konva"
import { PathConfig } from "konva/lib/shapes/Path";

export default class PencilIcon extends Konva.Path{
  constructor(config : PathConfig){
    config.stroke = "black";
    config.strokeWidth= 1;
    config.lineCap = "round";
    config.lineJoin="round";
    config.data = "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125";
    super(config);
  }
}