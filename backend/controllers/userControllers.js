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