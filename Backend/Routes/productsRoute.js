const express = require("express");
const{productModel} = require("../Models/productModel")

const productRouter = express.Router();

productRouter.get("/",(req,res)=>{
    res.send("All the products");
})

productRouter.post("/create",async (req,res)=>{
    // res.send("Created");
    const payload = req.body
    const product = new productModel(payload)
    await product.save()
    res.send({"msg":"Product Created"})
})

productRouter.delete("/delete/:id",(req,res)=>{
    res.send("Deleted");
})

module.exports={
    productRouter
}