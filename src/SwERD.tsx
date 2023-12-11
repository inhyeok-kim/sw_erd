import { useEffect, useRef, useState } from "react"
import ErdCv from "./classes/ErdCv";
import Rect from "./classes/elements/Rect";
import Table from "./classes/elements/Table";

export default function SwERD(){
    const canvas = useRef<HTMLCanvasElement>(null);
    const [erdCv,setErdCv] = useState<ErdCv>();

    useEffect(()=>{
        if(canvas.current){
            setErdCv(new ErdCv(canvas.current));
        }
    },[]);

    function addRect(){
        if(erdCv && canvas.current){
            const rect = new Table(canvas.current, 10,10);
            erdCv?.addElement(rect);
        }
    }

    return (
        <div>
            <button onClick={addRect}>+</button>
            <br/>
            <canvas ref={canvas}>

            </canvas>
        </div>
    )
}

