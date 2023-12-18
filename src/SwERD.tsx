import { useEffect, useRef, useState } from "react"
import ErdCv from "./classes/ErdCv";

export default function SwERD(){
    const canvas = useRef<HTMLCanvasElement>(null);
    const [erdCv,setErdCv] = useState<ErdCv>();

    useEffect(()=>{
        if(canvas.current){
            setErdCv(new ErdCv(canvas.current));
        }
    },[]);

    useEffect(()=>{
        if(canvas.current){
            canvas.current!.width = window.innerWidth-500;
            canvas.current!.height = window.innerHeight-100;
            window.addEventListener("resize",resizeCanvas);
        }
    },[canvas]);

    function resizeCanvas(){
        canvas.current!.width = window.innerWidth-500;
        canvas.current!.height = window.innerHeight-100;
    }

    return (
        <div style={{width : '100%',height : '100%',textAlign:'center'}} >
            <button onClick={()=>{console.log(erdCv?.getElementList())}}>get</button>
            <canvas ref={canvas} style={{border:'1px solid black'}} >

            </canvas>
        </div>
    )
}

