const express = require("express");
const router = express.Router();
const isLogged = require("../utils/validator")
router.use(isLogged);
let Todo = require("../models/todo");

// route for when user deletes a todo item
router.post('/todo', async function (req, res) {
    try {
    if(!req.body._id) return res.status(404).json({success:false,message:"todo id required"});
   // if(!req.body.pageNumber) return res.status(404).json({success:false,message:"pagenumber required"});
    if(!req.isAuthenticated()) return res.status(400).json({success:false,message:"session timeout"})
            // remove the document in the database that matches the id.
    await Todo.updateOne({ _id: req.body._id},{isDeleted:true},{new:true})
   
   // send response back with the document object that was deleted
   return res.status(200).json({
       success: true,
       message: 'Deleted successfully'
   })

    } catch (error) {
        return res.status(500).send({success: true, message: 'something went wrong'});
    }

});

module.exports = router;