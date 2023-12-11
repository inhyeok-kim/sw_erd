import { Menu, MenuItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";
import { addListener, setState } from "../GlobalState";
import { EventContext } from "../classes/MouseObject";

export default function ErdContextMenu({
    canvas,
    addTable
} : {
    canvas : HTMLCanvasElement
    addTable : Function
}){

    const [open, setOpen] = useState<boolean>(false);

    useEffect(()=>{
        addListener("contextmenu",handleContextmenu);
    },[]);
    const [mouse, setMouse] = useState<{
        x : number
        y : number
    }>();
    
    const handleContextmenu = (e: EventContext) => {
        if(e.isContext){
            setMouse({
                x : e.x,
                y : e.y
            })
            setOpen(true);
        } else {
            setOpen(false);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    function fnNew(){
        handleClose();
        addTable(mouse?.x,mouse?.y);
    }

    return (
        <div>
            <Menu
                open={open}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    mouse ? { top: mouse.y, left: mouse.x }
                    : undefined
                }
            >
                <MenuItem dense onClick={fnNew}>New</MenuItem>
            </Menu>
        </div>
    )
}