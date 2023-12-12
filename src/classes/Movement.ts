import CVElement from "./CVElement";

const movementTargetList : CVElement[] = [];

export function getMovementTargetList(){
    return movementTargetList;
}
export function putMovement(ele : CVElement){
    movementTargetList.push(ele);
}

export function resetMovement(){
    movementTargetList.splice(0, movementTargetList.length);
}

export function moveAll(movementX : number, movementY : number){
    movementTargetList.forEach(ele=>{
        ele.move(movementX,movementY);
    })
}