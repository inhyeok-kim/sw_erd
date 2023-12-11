const state = {

} as {
    [index : string] : any
}

const listener = {

} as {
    [index : string] : Function[]
}

export function getState(key:string){
    return state[key];
}

export function setState(key : string, value : any){
    state[key] = value;
    if(listener[key]){
        listener[key].forEach(callback=>{
            callback(value);
        })
    }
}

export function addListener(key : string, callback : Function){
    if(listener[key]){
        listener[key].push(callback);
    } else {
        listener[key] = [callback];
    }
}
