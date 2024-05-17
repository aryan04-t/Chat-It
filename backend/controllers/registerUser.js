import bcryptjs from 'bcryptjs'; 

import userModel from '../models/userModel.js'; 


const registerUser = async (req, res) => {
    try{
        const {name, email, password, profile_pic} = req.body; 
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
            password : hashPassword
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
        console.log(`Error occured in registerUser controller: ${err.message}`); 
        return res.status(500).json({
            message : `Internal server error`, 
            error : true
        }); 
    }
}


export default registerUser; 