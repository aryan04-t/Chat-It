import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 

import connectToDB from './db/connectToMongoDB.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
})); 

app.use(express.json()); 
app.use(cookieParser()); 


app.use('/api/auth', authRoutes); 
app.use('/api/user', userRoutes); 


connectToDB().then( () => {
    app.listen(PORT, (err) => {
        if(err){
            console.log(`Error occured while starting the server in app.js`);
        }
        else{
            console.log(`Started server on port no.: ${PORT}`); 
            console.log(`Press ctrl and click me: http://localhost:${PORT}`); 
        }
    });
}); 