const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
 const PORT = 5175;
const dotenv = require('dotenv');
dotenv.config()


app.use(cors());
app.use(express.json());


// Connecting to MongoDB
mongoose
.connect(process.env.DB_URL,{})
.then(()=>{
    console.log("MongoDb is Connected")
})
.catch((err)=>{
        console.log("MongoDb Not Connected",err.message)
})

app.use('/signin',require('./routes/signin'));
app.use('/login',require('./routes/login'))
app.use('/product',require('./routes/product'))
app.use('/wishlist',require('./routes/wishlist'))





app.listen(PORT,()=>{
    console.log("Server is running on PORT",PORT);
})