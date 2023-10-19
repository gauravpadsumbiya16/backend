const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

exports.connectToDatabase = () => {
    mongoose.connect(`${process.env.MONGODB_STRING}`).
    then(()=>{console.log(`connection successful`)})
    .catch((error)=>{console.log("error = ",error)});
    
}

