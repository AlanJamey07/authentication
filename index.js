require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require("./database/connectDB");
const routes = require('./Routes/index');

let port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1" , routes);

app.get("/" , (req,res) =>{
    res.send("Project successfully deployed");
})







const start = async() =>{
    await connectDB(process.env.MONGO_URI);
    app.listen(port , (req ,res) =>{
        console.log(`Server is listening to port ${port}`);
    })
}

start();