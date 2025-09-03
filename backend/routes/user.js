const express= require('express')
const router = express.Router()
const zod = require('zod')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middleware')
const {User, Accounts} = require('../db')

const signupbody = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    firstname: zod.string(),
    lastname : zod.string()
})

router.post('/signup',async(req,res)=>{
    const response=signupbody.safeParse(req.body)
    if(!response.success){
        return res.status(411).json({
            msg : "invalid input"
        })
    }

    const exist = await User.findOne({
        username : req.body.username
    })

    if(exist){
        return res.status(411).json({
            msg : "User already exist"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })

    const userId = user._id

    await Accounts.create({
        userId,
        balance : 1 + Math.random()*10000
    })
    const token = jwt.sign({userId},JWT_SECRET)

    res.json({
        msg : "User created successfully",
        token : token
    })

})

const signinbody = zod.object({
        username : zod.string().email(),
        password : zod.string()
    })

router.post('/signin',async(req,res)=>{
    const response = signinbody.safeParse(req.body)
    if(!response.success){
        return res.status(411).json({
            msg : "invalid credentials"
        })
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password,
    })
    
    if(user){ 
        const token = jwt.sign({userid: user._id},JWT_SECRET)
        return res.status(200).json({
            token,
        })
    }
    else{
        res.status(411).json({
            msg : "Error While logging in"
        })
    }

})

const updateData = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})

router.put('/',authMiddleware, async (req,res)=>{
    const {success} = updateData.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg : "invalid input",
        })
    }
    await User.updateOne({_id: req.userId},req.body);

    res.status(200).json({
        msg : "Updated successfully"
    })
})

router.get('/bulk',async(req,res)=>{
    const name = req.query.filter;

    const filteredUser = await User.find({
        $or : [
            {firstname : { "$regex" : name, $options : 'i'}},
            {lastname : { "$regex" : name, $options : 'i'}}
        ]
    })

    res.json({
        Users: filteredUser.map(user=>({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

module.exports = router;