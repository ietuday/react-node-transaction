const express = require("express");
const router = express.Router();

let Wallet = require("../models/wallet");
let Transaction = require("../models/transaction");
const mongoose = require('mongoose');


router.post('/transact/:walletId', async function (req, res) {
    // create wallet model with data passed from request and save to databse
    if (!req.params.walletId) return res.status(404).json({ success: false, message: "walletId is required" });
    let resp;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const wallet = await Wallet.findOne({ "_id": req.params.walletId }).session(session)
        const transaction = {
            wallet: wallet._id,
            amount: req.body.amount,
            description: req.body.description ? req.body.description : 'setup transaction',
            balance: Number.parseFloat(wallet.balance) + Number.parseFloat(req.body.amount),
            type: parseInt(req.body.amount) > 0 ? 'CREDIT' : 'DEBIT',
        }
        wallet.balance = transaction.balance
        wallet.save({session})
        const trans = await Transaction.create([transaction], { session });
        resp = { wallet, trans }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: error.message })
    }
    await session.commitTransaction();
    session.endSession();
    return res.send(resp);
});

router.get('/transactions', async function (req, res) {
    // create wallet model with data passed from request and save to databse
    if (!req.query.walletId) return res.status(404).json({ success: false, message: "walletId is required" });
    let resp;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let paginations = {}
        if(req.query.skip && req.query.limit){
            paginations.skip = req.query.skip
            paginations.limit = req.query.limit
        }
        const transactionList = await Transaction
            .find(
                { "wallet": mongoose.Types.ObjectId(req.query.walletId) }, {}, paginations
            )
            .populate('wallet')
            .sort({'createdAt':-1})
            .session(session)
        const transactionCount = await Transaction.count({ "wallet": mongoose.Types.ObjectId(req.query.walletId)})
        resp = {transactionCount, transactionList };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ success: false, message: error.message })
    }
    await session.commitTransaction();
    session.endSession();
    return res.send(resp);
});

module.exports = router;