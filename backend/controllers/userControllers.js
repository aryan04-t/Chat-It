import userModel from '../models/userModel.js';


export const getUserDetails = (req, res) => {
    try{
        const userDetails = req.user; 
        return res.status(200).json({
            data : userDetails,
            success : true 
        })
    }
    catch(err){
        console.log(`Error occured while getting user details ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true 
        })
    }
}


export const updateUserNameAndProfilePic = async (req, res) => {
    try{
        const { name, profile_pic } = req.body; 
        const user = req.user; 
        await userModel.updateOne({ _id : user._id}, {
            name, 
            profile_pic
        }); 
        const updatedUserInformation = await userModel.findById(user._id).select('-password'); 
        return res.status(200).json({
            message : "User's profile details got updated successfully",
            data : updatedUserInformation, 
            success : true
        })
    }
    catch(err){
        console.log(`Error occured while updating user details ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error', 
            error : true
        })
    }
}