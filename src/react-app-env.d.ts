/// <reference types="react-scripts" />

export interface MouseObject {
    x:number
    y:number
    isDown : boolean
    clickTarget : null | CVElement,
    downTarget : null | CVElement,
    hoverTarget : null | CVElement,
    downTargetGapX : number,
    downTargetGapY : number,
};

