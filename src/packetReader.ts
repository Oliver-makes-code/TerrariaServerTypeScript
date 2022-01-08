enum dataTypes {
    BYTE,
    I16,
    I32,
    SINGLE,
    STRING
}
const BYTE = dataTypes.BYTE;
const I16 = dataTypes.I16;
const I32 = dataTypes.I32;
const SINGLE = dataTypes.SINGLE;
const STRING = dataTypes.STRING;

type packetType = {
    [id: number]: dataTypes[]
}

var packets: packetType = {};

function registerPacket(id: number, ...types: dataTypes[]) {
    packets[id] = types;
}


registerPacket(1,STRING);


export default function parsePacket(buffer: Buffer): {
    id: number
    data?: any[]
} {
    let id = buffer[2];
    let types = packets[id];
    if (!types) return {id};
    let data = [];
    let idx = 3;
    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        switch(type) {
            case BYTE:
                data.push(parseByte(buffer,idx));
                i++;
                break;
            case I16:
                data.push(parseI16(buffer,idx));
                i+= 2;
                break;
            case I32:
                data.push(parseI32(buffer,idx));
                i+= 4;
                break;
            case SINGLE:
                data.push(parseSingle(buffer,idx));
                i += 4;
                break;
            case STRING:
                let str = parseStr(buffer, idx);
                i += str.length+1;
                data.push(str);
                break;
        }
    }
    return {
        id, data
    };
}

function parseByte(buffer: Buffer, i: number):number {
    return buffer[i];
}
function parseI16(buffer: Buffer, i: number):number {
    return (buffer[i]<<8)+buffer[i+1];
}
function parseI32(buffer: Buffer, i: number):number {
    return (((buffer[i]<<8)+buffer[i+1]<<8)+buffer[i+2]<<8)+buffer[i+3];
}
function parseSingle(buffer: Buffer, i:number):number {
    let b0 = parseByte(buffer,i);
    let b1 = parseByte(buffer,i+1);
    let b2 = parseByte(buffer,i+2);
    let b3 = parseByte(buffer,i+3);
    let abuffer = new ArrayBuffer(4);
    let bytes = new Uint8Array(abuffer);
    bytes[0] = b3;
    bytes[1] = b2;
    bytes[2] = b1;
    bytes[3] = b0;
    let floats = new Float32Array(abuffer);
    return floats[0];
}
function parseStr(buffer:Buffer, i:number):string {
    let out = "";
    let len = buffer[i];
    i++;
    for (let j = 0; j < len; j++) {
        out += String.fromCharCode(buffer[i+j]);
    }
    return out;
}