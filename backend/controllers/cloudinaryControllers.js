import cloudinary from 'cloudinary'; 

export const deleteCloudinaryAssetController = async (req, res) => {
    try{
        const {public_id} = req.body;
        cloudinary.uploader.destroy(public_id).then( ({result}) => {
            if(result === 'ok'){
                return res.status(200).json({
                    message : 'Asset deleted successfully',
                    success : true 
                });           
            }
            else{
                return res.status(500).json({
                    message : 'Asset deletion was unsuccessfull',
                    success : false
                }); 
            }
        })
    }
    catch(err){
        console.log(`Error occured while deleting cloudinary asset: ${err.message}`); 
        return res.status(500).json({
            message : 'Internal server error',
            error : true 
        })
    }
}