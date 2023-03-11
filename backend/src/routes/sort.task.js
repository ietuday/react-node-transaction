const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator")
router.use(isLogged);
let Todo = require("../models/todo");

// route for when submits new todo item
router.get('/todos', async function (req, res) {
    // create todo model with data passed from request and save to databse
    if(!req.isAuthenticated()) return res.status(400).json({success:false,message:"session timeout"})
         try {
            const docs = await Todo.find({isDeleted:false,email:req.decoded.email},{todo:1,status:1,date:1}).sort({todo:1})
            return res.status(200).json({success:true,data:docs})
         } catch (error) {
            return res.status(500).json({success:false,error:error})
         }

    
});

module.exports = router;