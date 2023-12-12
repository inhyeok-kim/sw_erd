import ErdCv from "../ErdCv";
import Table from "../elements/Table";

export default class TableAPI {
    private static erdCv : ErdCv | null = null;

    static setErdCv(erdCv : ErdCv){
        this.erdCv = erdCv;
    }

    static addTableApi(x : number, y : number){
        const rect = new Table(this.erdCv?.canvas!,x,y);
        this.erdCv?.addElement(rect);
    }
}