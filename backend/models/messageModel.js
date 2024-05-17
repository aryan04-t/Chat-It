import mongoose from 'mongoose'; 

const messageSchema = new mongoose.Schema({

    text : {
        type : String, 
        default : "" 
    },
    imageURL : {
        type : String, 
        default : ""
    },
    videoURL : {
        type : String,
        default : ""
    },
    seen : {
        type : Boolean,
        default : false
    }

}, {
    timestamps : true 
});

export const messageModel = mongoose.model('message', messageSchema); 