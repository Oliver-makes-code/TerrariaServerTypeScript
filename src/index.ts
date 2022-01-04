import * as net from "net";
const server = net.createServer();
server.on("connection", (socket) => {
    console.log(socket.address());
});

server.listen(7778);