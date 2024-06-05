import toast from "react-hot-toast";

const uploadFile = async (file) => {
    
    try{
        const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`; 
        
        const formData = new FormData(); 
        
        formData.append('file', file);
        formData.append('upload_preset', 'my-chat-app-profile-pics');           // Define cloudinary folder name in which upload should happen 

        const response = await fetch(url, {
            method : 'post',
            body : formData 
        })

        const responseData = await response.json(); 

        if(responseData?.error?.message){
            toast.error('An error occured while uploading Profile Pic, Please try again'); 
            return responseData;
        }
        
        if(responseData?.public_id !== ''){
            toast.success('Image uploaded successfully'); 
            return responseData;
        }
    }
    catch(err){
        console.log(`Error occured while uploading file to cloudinary: ${err}`);
        console.log(`Error thrown to upper hierarchy`); 
        throw err;
    }
}

export default uploadFile; 