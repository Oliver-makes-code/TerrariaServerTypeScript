enum Types {
    BOOL = 0,
    BYTE = 1,
    INT16 = 2,
    INT32 = 3,
    STRING = 4,
    SINGLE = 5,
    DOUBLE = 6,
    RECT = 8
}

export default class Type {
    type: Types = Types.BOOL;
    data: number[] = [];
    
}