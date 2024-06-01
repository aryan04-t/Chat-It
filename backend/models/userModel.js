import mongoose from 'mongoose'; 


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
    },
    email : {
        type : String, 
        required : [true, "provide email"],
        unique : true 
    },
    password : {
        type : String, 
        required : [true, "provide password"],
        minlength: 6
    },
    profile_pic : {
        type : String, 
        default : ""
    },
    cloudinary_img_public_id : {
        type : String,
        default : ""
    }
}, {
    timestamps : true
});


const userModel = mongoose.model('user', userSchema); 

export default userModel; 