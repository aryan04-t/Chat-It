import express from 'express' 
import { Server } from 'socket.io' 
import http from 'http' 
import getUserDetailsFromToken from '../utils/getUserDetailsFromToken.js';


const app = express(); 

const server = http.createServer(app); 
const io = new Server(server, {
    cors : {
        origin : process.env.FRONTEND_URL,
        credentials : true 
    }
})


const onlineUser = new Set(); 


io.on('connection', async (socket) => {

    console.log(`User connected: ${socket.id}`); 

    const token = socket.handshake.auth.token; 

    console.log(token); 
    const user = await getUserDetailsFromToken(token);
    console.log(user);
    
    socket.join(user?._id); 
    onlineUser.add(user?._id); 

    console.log(onlineUser);

    io.emit('onlineUser', Array.from(onlineUser)); 
    
    socket.on('disconnect', () => {
        onlineUser.delete(user?._id); 
        io.emit('onlineUser', Array.from(onlineUser)); 
        console.log(`User disconnected: ${socket.id}`); 
        console.log(onlineUser);
    })
})


export {app, server}; 