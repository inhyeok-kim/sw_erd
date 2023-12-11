import { useEffect, useRef, useState } from "react"
import ErdCv from "./classes/ErdCv";
import Table from "./classes/elements/Table";
import ErdContextMenu from "./components/ErdContextMenu";

export default function SwERD(){
    const canvas = useRef<HTMLCanvasElement>(null);
    const [erdCv,setErdCv] = useState<ErdCv>();

    const [open, setOpen] = useState<boolean>(false);
    
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

    function addTable(x:number, y:number){
        if(erdCv && canvas.current){
            const rect = new Table(canvas.current, x,y);
            erdCv?.addElement(rect);
        }
    }

    return (
        <div style={{width : '100%',height : '100%',textAlign:'center'}}>
            <canvas ref={canvas} style={{border:'1px solid black'}} >

            </canvas>

            {
                canvas.current ? 
                <ErdContextMenu canvas={canvas.current} addTable={addTable} />
                : ''
            }
        </div>
    )
}

