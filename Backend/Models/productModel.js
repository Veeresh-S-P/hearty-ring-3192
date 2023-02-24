const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    discription: Object,
    price:Number,
    imgUrl: String
})

const productModel= mongoose.model("product", productSchema) 

module.exports={
    productModel
}