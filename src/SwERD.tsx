import { useEffect, useRef, useState } from "react"
import ErdCv from "./classes/ErdCv";
import Konva from "konva";
import { Stage } from "konva/lib/Stage";

export default function SwERD(){
    const container = useRef<HTMLDivElement>(null);
    const [erdCv,setErdCv] = useState<ErdCv>();
    const [stage,setStage] = useState<Stage>();

    useEffect(()=>{
        const stage = new Konva.Stage({
            container : 'erdcanvas',
            width : 500,
            height : 500,
        })
        setStage(stage);
        setErdCv(new ErdCv(stage));
    },[]);

    useEffect(()=>{
        if(stage){
            container.current!.style.width = (window.innerWidth-500) + 'px';
            container.current!.style.height = (window.innerHeight-100) + 'px';
            stage?.width(window.innerWidth-500);
            stage?.height(window.innerHeight-100);
            window.addEventListener("resize",resizeCanvas);
        }
    },[stage]);
    
    function resizeCanvas(){
        container.current!.style.width = (window.innerWidth-500) + 'px';
        container.current!.style.height = (window.innerHeight-100) + 'px';
        stage?.width(window.innerWidth-500);
        stage?.height(window.innerHeight-100);
    }

    return (
        <div style={{width : '100%',height : '100%',textAlign:'center'}} >
            <div ref={container} id={'erdcanvas'} style={{width:'500px', height:'500px'}} >

            </div>
        </div>
    )
}

