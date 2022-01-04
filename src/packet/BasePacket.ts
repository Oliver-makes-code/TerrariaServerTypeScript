import Type from "../types/TType";

export default class Packet {
    type: Type;

    constructor(type:any, data:number[]) {
        this.type = new Type();
        this.type.type = type;
        this.type.data = data;
    }

    
}