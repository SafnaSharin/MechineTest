const mongoose = require('mongoose');
 const adminschema =mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String, required:true},
    image:{type:String, required:true},
    id : { type: Number, required: false },
 })
 const adminModel = mongoose.model('adminModel',adminschema);
 module.exports=adminModel;