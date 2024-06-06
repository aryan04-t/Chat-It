import express from 'express' 
import { Server } from 'socket.io' 
import http from 'http' 
import getUserDetailsFromToken from '../utils/getUserDetailsFromToken.js';
import userModel from '../models/userModel.js';


const app = express(); 

const server = http.createServer(app); 
const io = new Server(server, {
    cors : {
        origin : process.env.FRONTEND_URL,
        credentials : true 
    }
})


const onlineUsers = new Set(); 


io.on('connection', async (socket) => {

    console.log(`User connected: ${socket.id}`); 

    const token = socket.handshake.auth.token; 
    const user = await getUserDetailsFromToken(token);
    
    socket.join(user?._id); 
    onlineUsers.add(user?._id?.toString()); 

    console.log(onlineUsers);

    io.emit('onlineUsers', Array.from(onlineUsers)); 

    socket.on('i-want-to-chat-with-this-user', async (userId) => {
        console.log('I am invoked'); 
        const userDetails = await userModel.findById(userId).select('-password'); 
        const payload = {
            _id : userDetails?._id, 
            name : userDetails?.name, 
            email : userDetails?.email, 
            profile_pic : userDetails?.profile_pic, 
            online : onlineUsers.has(userId) 
        }
        socket.emit('chat-receiving-user-details', payload); 
    })
    
    socket.on('disconnect', () => {
        onlineUsers.delete(user?._id?.toString()); 
        io.emit('onlineUsers', Array.from(onlineUsers)); 
        console.log(`User disconnected: ${socket.id}`); 
        console.log(onlineUsers);
    })
})


export {app, server}; 