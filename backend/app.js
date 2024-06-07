import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';

import cloudinary from 'cloudinary'; 

import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import cloudinaryRoutes from './routes/cloudinaryRoutes.js'; 

import connectToDB from './db/connectToMongoDB.js';

import {app, server} from './socket/index.js' 


dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});


// const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json()); 
app.use(cookieParser()); 


app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
})); 


app.use('/api/auth', authRoutes); 
app.use('/api/delete-cloudinary-asset', cloudinaryRoutes); 
app.use('/api/user', userRoutes); 


connectToDB().then( () => {
    server.listen(PORT, (err) => {
        if(err){
            console.log(`Error occured while starting the server in app.js`);
        }
        else{
            console.log(`Started server on port no.: ${PORT}`); 
            console.log(`Press ctrl and click me: http://localhost:${PORT}`); 
        }
    });
}); 