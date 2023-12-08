import { useEffect, useRef } from "react"
import Rect from "./classes/Rect";

export default function SwERD(){
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvas.current){
            const rect = new Rect(canvas.current, 10,10,100,100);
            rect.draw();
        }
    },[]);

    return (
        <canvas ref={canvas}>

        </canvas>
    )
}

