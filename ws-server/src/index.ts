import {WebSocketServer ,WebSocket} from 'ws'
const webSocket = new WebSocketServer({port: 8080})
 

interface User {
    socket : WebSocket,
    room: string
}
let allSockets : User[] = []

webSocket.on("connection", (socket) => {
    socket.on("message", (message) => {
       
        //{type: "join-room", room: "room1"}
        //{type: "message", room: "room1", message: "Hello"}
        //@ts-ignore
        const parsedMessage = JSON.parse(message)
        if(parsedMessage.type === "join-room"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type ==="message"){
            let currentUserRoom = null;
            for(let i = 0; i < allSockets.length; i++){
                if(allSockets[i].socket === socket){
                    currentUserRoom = allSockets[i].room
                }
            }
            for(let i = 0; i < allSockets.length; i++){
                if(allSockets[i].room === currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }
        }

  
        
})
})

