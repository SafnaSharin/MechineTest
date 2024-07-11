var express = require('express');
const adminModel=require('../model/admin')
const bcrypt = require('bcrypt');
var asyncHandler = require('express-async-handler');

exports.submit =asyncHandler(async(req,res)=>{
    const {name,address,password}=req.body
    const image = req.file.filename;
    console.log(req.file.filename)
    console.log(req.body)
try{
   const data= await adminModel.create({
        name:name,
        address:address,
        password:password,
        image:image
    })
    console.log(data)
    res.status(201).json({ message: " added" }); 
}
catch(error){
    console.log("error")
    res.status(500).json({ error: "an error occurred" });
}
})

exports.details = asyncHandler(async (req, res) => {
    try {
      const detail = await adminModel.find();
      res.json(detail);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  exports.edit=asyncHandler(async(req,res)=>{
    let {id}=req.params;
    try{
        const editdata=await adminModel.findById(id);
        if(!editdata){
            return res.status(404).json({error:'product not found'})
        }
        res.json(editdata)
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'an error occurred'})
    }
  });

  exports.update = asyncHandler(async(req, res) =>{
    const{id}=req.params;
    const{ name, address, password}=req.body;
    console.log(req.body)
    console.log(id);
    try{
        const details = await adminModel.findById(id);
        if(!details){
            return res.status(404).json({error:'not found details'});
        }
        details.name = name;
        details.address = address;
        details.password = password;
        
      if(req.file){
      details.image=req.file.filename
     }        

        const updatedetails=await details.save();
         
        res.json(updatedetails);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'error occuired'});
    }
});

exports.delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const deleted = await adminModel.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ error: "user not found" });
      }
      res.json({ message: "user deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  
 
exports.signin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  try {
      const user = await adminModel.findOne({ name });

      if (user) {
          const match = await bcrypt.compare(password, user.password);

          if (match) {
              res.status(200).json({ message: "Sign-in successful" });
          } else {
              res.status(401).json({ error: "Invalid credentials" });
          }
      } else {
          res.status(401).json({ error: "Invalid credentials" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during sign-in" });
  }
});