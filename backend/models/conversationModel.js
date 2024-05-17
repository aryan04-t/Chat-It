import mongoose from 'mongoose'; 

const conversationSchema = new mongoose.Schema({

    sender : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'user' 
    },
    receiver : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'user' 
    },
    messages : [
        {
            type : mongoose.Schema.ObjectId, 
            ref : 'message' 
        }
    ]

}, {
    timestamps : true
}); 

const conversationModel = mongoose.model('conversation', conversationSchema); 

export default conversationModel; 