const express = require("express");
const {connection} = require("./Config/db");
const {userRouter} = require("./Routes/userRoute")
const {productRouter}= require("./Routes/productsRoute")
const {authenticate} = require("./Middelwares/authencationMiddleware")

const app = express();

app.use(express.json())

// basic route 
app.get("/",(req,res)=>{
    res.send("Home Page");
})

// import route from another folder 
app.use("/users", userRouter);
app.use(authenticate)
app.use("/product", productRouter)

// server connect 
app.listen(2000, async()=>{
    try {
        await connection
        console.log("Connected to the DB");
    }
    catch (error){
        console.log(error.message)
    }
    console.log("Server running at port 2000")
})
