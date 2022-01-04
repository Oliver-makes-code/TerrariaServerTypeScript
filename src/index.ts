import * as net from "net";
const server = net.createServer();
server.on("connection", (socket) => {
    let addr = socket.remoteAddress + ":" + socket.remotePort;
    console.log(addr + " connected");
    socket.on("data", (data) => {
        console.log("Recieved data: " + data);
    });
    socket.on("close", (err) => {
        console.log(addr + " disconnected");
    });
    socket.on("error", (err) => {

    });
});

server.listen(7778);