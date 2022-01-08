import * as net from "net";
import parsePacket from "./packetReader";

let server = net.createServer((incoming) => {
    let outgoing = new net.Socket({});
    outgoing.connect({
        "path":"",
        "port":7777,
        "host": "127.0.0.1"
    });
    incoming.on("data", (data) => {
        outgoing.write(data);
        console.log("Incoming: " + parsePacket(data).id + " : " + parsePacket(data).data);
    });
    outgoing.on("data", (data) => {
        incoming.write(data);
        console.log("Incoming: " + parsePacket(data).id + " : " + parsePacket(data).data);
    });
    incoming.once("end", (err) => {
        outgoing.end();
        outgoing.destroy();
    });
});

server.listen(7778);