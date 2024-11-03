const express = require("express");
const app=express();
const dotenv=require('dotenv');
const {connection}=require('./connectionmon');
const userRouter=require('./routs/userRouts');
const cors=require('cors');
const paymentRouter = require("./routs/AccountRuts");
app.use(cors());
app.use(express.json())
dotenv.config();
connection();
app.use('/api/vi',userRouter);
app.use('/api',paymentRouter);
app.listen(process.env.PORT,()=>{
    console.log('server on');
})


