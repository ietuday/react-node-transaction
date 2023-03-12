const express = require("express");
const router = express.Router();

let Wallet = require("../models/wallet");
let Transaction = require("../models/transaction");
const mongoose = require('mongoose');


// route for when submits new todo item
router.post('/setup', async function (req, res) {
    console.log("assssssssss", req.body)
    // create wallet model with data passed from request and save to databse
    if(!req.body.balance) return res.status(404).json({success:false,message:"balance is required"});
    if(!req.body.name) return res.status(404).json({success:false,message:"name is required"});
    if(!(parseInt(req.body.balance, 10) > 0)) return  res.status(404).json({success:false,message:"balance must be positive"});
    let resp;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.create([{ balance: req.body.balance, name: req.body.name }], {session});
        const transaction = {
            wallet: wallet[0]._id,
            amount: req.body.balance,
            description: 'setup transaction',
            balance: req.body.balance,
            type: 'CREDIT',
        }
        const trans = await Transaction.create([transaction], {session});
       
        resp = {wallet, trans}  

    } catch (error) {
        await session.abortTransaction(); 
        session.endSession();
        return res.status(404).json({success:false,message:error.message})
    }
    await session.commitTransaction();
    session.endSession();
    return res.send(resp);

});

router.get('/wallet/:walletId', async function (req, res) {
    // create wallet model with data passed from request and save to databse
    if(!req.params.walletId) return res.status(404).json({success:false,message:"walletId is required"});
    let resp;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.findOne({ "_id": req.params.walletId }).session(session)
        resp = wallet  
    } catch (error) {
        await session.abortTransaction(); 
        session.endSession();
        return res.status(404).json({success:false,message:error.message})
    }
    await session.commitTransaction();
    session.endSession();
    return res.send(resp);

});

module.exports = router;