const mongoose = require("mongoose");

function connectDB(){
    //mongoose.set("strictQuery",false);
    mongoose
    .connect("mongodb://0.0.0.0:27017/test")
    .then((result)=>{
        
console.log("database connected");
    })
    .catch((err)=>{
        console.log("errorrrrr")
    })
}
module.exports = connectDB;