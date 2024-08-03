
const express=require('express');
const cors=require('cors');
const newLocal = `./db`;
const { connectMongodb } = require(newLocal);
const newLocal_1 = './routes/foodroutes';
const newLocal_2 = './routes/userroute';
const newLocal_3 = './routes/cartrouter';
const newLocal_4 = './routes/orderrouter';
const foodrouter=require(newLocal_1)
const userrouter=require(newLocal_2)
const cartrouter=require(newLocal_3)
const orderrouter=require(newLocal_4)


// app config
const app=express();
const port=4000;


// middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{res.send("api working")});

//establishin db conex=ctions
connectMongodb('mongodb://127.0.0.1:27017/foodapp')

//api endpoint
app.use("/api/food",foodrouter)
app.use("/images",express.static("uploads"));
app.get("/",(req,res)=>{
    res.send("working api")
})
//api endpoint for user
app.use("/api/user",userrouter);
app.use("/api/cart",cartrouter);
app.use("/api/order",orderrouter);




app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})