import mongoose from 'mongoose'; 

const connectToMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log(`Connected to MongoDB Successfully`); 
    }
    catch(err){
        console.log(`Error occured while connecting to MongoDB ${err.message}`); 
    }
}

export default connectToMongoDB; 