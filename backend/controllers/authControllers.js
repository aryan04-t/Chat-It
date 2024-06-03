import bcryptjs from 'bcryptjs'; 

import userModel from '../models/userModel.js'; 
import generateTokenAndSetCookie from '../utils/generateTokenAndSetCookie.js';


export const signup = async (req, res) => {
    try{
        const {name, email, password, profile_pic, cloudinary_img_public_id} = req.body; 
        const checkEmail = await userModel.findOne({email}); 

        if(checkEmail){
            return res.status(400).json({
                message : "User already exists",
                error : true 
            }); 
        }

        const salt = await bcryptjs.genSalt(10); 
        const hashPassword = await bcryptjs.hash(password, salt); 

        const payload = {
            name, 
            email,
            profile_pic, 
            password : hashPassword,
            cloudinary_img_public_id
        }

        const user = new userModel(payload); 
        const userSave = await user.save(); 

        return res.status(201).json({ 
            message : 'User created successfully', 
            data : userSave,
            success : true
        }); 
    }
    catch(err){
        console.log(`Error occured in authController while signing up the user: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true
        }); 
    }
};


export const checkEmailForLogin = async (req, res) => {
    try{
        const {email} = req.body; 
        const user = await userModel.findOne({email}).select("-password"); 
        if(user){
            return res.status(200).json({
                message : "User Verified",
                success : true,
                data : user
            }); 
        }
        else{
            return res.status(400).json({
                message : "User doesn't exist"
            })
        }
    }
    catch(err){
        console.log(`Error occured in authController while checking the email: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true
        })
    }
};


export const checkPasswordAndLogin = async (req, res) => {
    try{
        const {password, userId} = req.body; 
        const user = await userModel.findById(userId); 
        
        if(user){
            
            const hashedPassword = user.password; 
            const isPasswordCorrect = await bcryptjs.compare(password, hashedPassword); 
            
            if(isPasswordCorrect){
                
                const tokenPayload = {
                    id : user._id
                };
                
                const token = generateTokenAndSetCookie(tokenPayload, res); 

                return res.status(200).json({
                    message : 'Logged In successfully', 
                    token, 
                    cloudinary_img_public_id : user.cloudinary_img_public_id, 
                    success : true
                })
            }
            else{
                return res.status(400).json({
                    message : 'User entered wrong password', 
                    success : false
                })
            }
        }
        else{
            return res.status(400).json({
                message : "User doesn't exits", 
                error : true 
            })
        }
    }
    catch(err){
        console.log(`Error occured in authControler while verifying user password: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error :true 
        }); 
    }
};



export const logout = (req, res) => {
    try{
        const cookieOptions =  {
            maxAge : 0, 
            httpOnly : true, 
            sameSite : "strict", 
            secure : true
        };
        res.cookie("jwt", "", cookieOptions); 
        return res.status(200).json({
            message : "Successfully Logged Out the User", 
            success : true
        }); 
    }
    catch(err){
        console.log(`Error occured while logging out: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error',
            error : true 
        })
    }
};