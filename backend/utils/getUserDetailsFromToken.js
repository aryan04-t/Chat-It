import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js';


const getUserDetailsFromToken = async (token) => {
    try{

        if(!token){
            return {
                message : 'Session timeout',
                logout : true 
            }; 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 

        if(decoded){
            const user = await userModel.findById(decoded.id).select('-password'); 
            if(user){
                return user; 
            }
            else{
                return {
                    message : 'User not found', 
                    error : true 
                }; 
            }
        }
        else{
            return {
                message : 'Unauthorized access - invalid token',
                error : true  
            };
        }
    }
    catch(err){
        console.log(`Error occured in getUserDetailsFromToken while verifying JWT: ${err.message}`);  
    }
}


export default getUserDetailsFromToken; 