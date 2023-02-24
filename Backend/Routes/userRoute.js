const express = require("express");
const {userModel} = require("../Models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userRouter= express.Router();

userRouter.post("/register", async (req,res)=>{
    const {name,email,pass} = req.body;
    try{
        const saltRounds=5; 
        bcrypt.hash(pass, saltRounds, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                console.log(err.message);
                res.send(err.message)
            }
            else{ 
                const user = new userModel({name,email,pass:hash});
                await user.save();
                res.send({"msg":"new User has been registered"})
            }
        });
    }
    catch(error){
        res.send({"msg":"Something went wrong", "error":error.message})
    }
})

userRouter.post("/login", async (req,res)=>{
    const {email, pass} = (req.body);
    try{
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                // result == true
                if (result){
                    let token = jwt.sign({course:"backend"},"secretToken")
                    res.send({"msg":"logged in","token":token})
                }
                else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
        }
        else{
            res.send({"msg":"Wrong Credentials"})
        }
    }
    catch(error){
        res.send({"msg":"Something went wrong", "error":error.message})
    }
})

module.exports={
    userRouter
}