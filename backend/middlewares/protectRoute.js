import jwt from 'jsonwebtoken'; 
import userModel from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt || ''; 

        if(!token){
            return res.status(401).json({
                message : 'Session timeout',
                logout : true 
            }); 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        if(decoded){
            const user = await userModel.findById(decoded.id).select('-password'); 
            if(user){
                req.user = user; 
            }
            else{
                return res.status(404).json({
                    message : 'User not found', 
                    error : true 
                }); 
            }
        }
        else{
            return res.status(401).json({
                message : 'Unauthorized access - invalid token',
                error : true  
            });
        }

        next();
    }
    catch(err){
        console.log(`Error occured in protectRoute middleware while verifying JWT: ${err.message}`); 
        return res.status(500).json({ 
            message : 'Internal server error', 
            error : true 
        }); 
    }
}

export default protectRoute; 