const mongoose = require("mongoose");

const connectDB = async ()=>{
    try
    {
        // mongoose.set('bufferCommands', false);   
        mongoose.connect(process.env.MONGO_URI);
        console.log(`Connecting to DB success`);
    }
    catch(err)
    {
        console.log(`Error: ${err}`);
    }
}

module.exports  = connectDB;
