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
        const { name, profile_pic, cloudinary_img_public_id } = req.body; 
        const user = req.user; 
        await userModel.updateOne({ _id : user._id}, {
            name, 
            profile_pic, 
            cloudinary_img_public_id 
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


export const getAllMatchingUsers = async (req, res) => {
    try{
        const {searchQuery} = req.body; 
        const query = new RegExp(searchQuery, 'i', 'g'); 

        const allUser = await userModel.find({
            '$or' : [
                { name : query },
                { email : query }
            ]
        }).select('-password'); 

        const user = req.user; 

        const result = allUser.filter( (currUser) => {
            return currUser.email !== user.email; 
        })

        return res.status(200).json({
            message : 'Search result of all matched users',
            data : result,
            success : true 
        }) 
    }
    catch(err){
        console.log(`Error occured while fetching details of other user's expcet the loggedin user: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error',
            error : true
        })
    }
}