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
            canvas.current!.parentElement!.style.width = (window.innerWidth-500) + 'px';
            canvas.current!.parentElement!.style.height = (window.innerHeight-100) + 'px';
            window.addEventListener("resize",resizeCanvas);
        }
    },[canvas]);
    
    function resizeCanvas(){
        canvas.current!.width = window.innerWidth-500;
        canvas.current!.height = window.innerHeight-100;
        canvas.current!.parentElement!.style.width = (window.innerWidth-500) + 'px';
        canvas.current!.parentElement!.style.height = (window.innerHeight-100) + 'px';
    }

    return (
        <div style={{width : '100%',height : '100%',textAlign:'center'}} >
            <div style={{overflow:'hidden'}}>
                <canvas ref={canvas} style={{border:'1px solid black'}} >

                </canvas>
            </div>
        </div>
    )
}

