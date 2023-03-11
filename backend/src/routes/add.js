const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator");
const passport = require("passport")
router.use(isLogged);


let Todo = require("../models/todo");

// route for when submits new todo item


router.post('/todo',async function (req, res) {
    
    if(!req.body.todo) return res.status(404).json({success:false,message:"todo name required"});
    if(!req.body.status) return res.status(404).json({success:false,message:"todo status required"});
    if(!req.body.date) return res.status(404).json({success:false,message:"todo date required"});
    if(!req.isAuthenticated()) return res.status(400).json({success:false,message:"session timeout"})
   //   console.log("req.session.user,",req.session)
    // create todo model with data passed from request and save to databse
    console.log("decode",req.decoded)
try {
    const doc = await Todo.create({
        todo: req.body.todo,
        status: req.body.status,
        user: req.decoded.email,
        date: req.body.date 
    });
    console.log("docsss",doc)
    return res.status(201).json({
        success: true,
        message: 'Todo created successful',
        data: doc
    })
} catch (error) {
    console.log("error",error)
    return res.status(500).send({
        success: false,
        message: 'Something went wrong',
        error:error
    })
}


});

module.exports = router;