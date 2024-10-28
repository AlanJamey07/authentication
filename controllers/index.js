const Detail = require('../models/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("express-async-errors");
require('dotenv').config();


const createUser = async(req ,res ,next) =>{
    let {username , password} = req.body;
     hash = await bcrypt.hash(password , 10);
    let user = await Detail.create({username , password:hash});
    res.json(user);
}





const login  = async(req,res,next) =>{
    let {username , password} = req.body;
    let user = await Detail.findOne({username:username});
    let match = await bcrypt.compare(password , user.password);
    if(!match){
       return res.json("password is Wrong");
    }
    const token =  jwt.sign({username} , process.env.SECRET , {expiresIn : "200000"});
    res.json(token);
}

const dashBoard = async(req,res,next) =>{
    const Bearer  = req.headers.authorization;   
    try{
        const token = Bearer.split(" ")[1];
        const decoded = await jwt.verify(token , process.env.SECRET);
        res.json(decoded);
        console.log("Hello");
    }
    catch(error){
        res.json({msg :"token not valid!" , error});
    }
}












module.exports = {
    createUser,
    login,
    dashBoard,
} 