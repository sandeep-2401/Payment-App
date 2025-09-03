const express = require('express');
const { Accounts } = require('../db');
const { authMiddleware } = require('../middleware');
const { default: mongoose } = require('mongoose');

const router = express.Router()

router.get('/balance',authMiddleware,async(req,res)=>{
    const userid = req.userId;
    const data = await Accounts.findOne({userId:userid})

    res.json({
        balance : data.balance,
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction()

    const from = req.userId;
    const to = req.body.to;
    const amount =req.body.amount;

    const data = await Accounts.findOne({userId:from}).session(session)
    if(data.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            msg : "Insufficient Balance",
        })
    }

    const userDetail = await Accounts.findOne({userId:to}).session(session)
    if(!userDetail){
        await session.abortTransaction()
        return res.status(400).json({
            msg : "Invalid account",
        })
    }

    await Accounts.updateOne(
        {userId : from}, 
        {$inc: {balance : -amount}}
    ).session(session)

    await Accounts.updateOne(
        {userId : to}, 
        {$inc :{balance : +amount}}
    ).session(session)

    session.commitTransaction()

    res.json({
        msg:"Transfer successful"
    })

})

module.exports = router;