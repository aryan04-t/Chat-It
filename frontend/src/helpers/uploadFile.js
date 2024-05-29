const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`; 
import toast from "react-hot-toast";

const uploadFile = async (file) => {

    try{
        const formData = new FormData(); 
        formData.append('file', file);
        formData.append('upload_preset', 'my-chat-app-files');           // Define cloudinary folder name in which upload should happen 

        const response = await fetch(url, {
            method : 'post',
            body : formData 
        })

        const responseData = await response.json(); 

        if(responseData.public_id !== ''){
            toast.success('Image uploaded successfully'); 
        }
        else{
            toast.error('Please select the image'); 
        }

        return responseData
    }
    catch(err){
        throw err;
    }
}

export default uploadFile; 