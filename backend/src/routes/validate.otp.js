const express = require("express");
const router = express.Router();


let Account = require("../models/account");

// route for when user deletes a todo item
router.post('/validate', async function (req, res) {
  try {
    if(!req.body.email) return res.status(404).json({success:false,message:"email required"});
    if(!req.body.otp) return res.status(404).json({success:false,message:"otp required"});
   //if(!req.isAuthenticated()) return res.status(400).json({success:false,message:"session timeout"})
    const doc = await Account.findOne({ email: req.body.email })
    if (doc) {
      if(doc.otp === req.body.otp) {
        await Account.updateOne({ _id: doc._id },{isActive:true,otp:null},{new:true});
        return res.status(200).json({success:true,message:"otp verified successfully"});}
      else return res.status(404).json({success:false,message:"invalid otp"});   
    }
    else return res.status(404).json({success:false,message:"email does not exist"});  
  } catch (error) {
    return res.status(500).json({success:false,message:"something went wrong"});
  }
});

module.exports = router;