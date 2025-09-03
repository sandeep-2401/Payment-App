const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('./config')

const authMiddleware = (req,res,next)=>{
    let token = req.headers.authorization

    if(!token || !token.startsWith('Bearer')){
        return res.status(403).json({
            msg : "invalid auth header"
        })
    }

    token = token.split(' ')[1]

    try{
        const verified=jwt.verify(token,JWT_SECRET);
        req.userId=verified.userid;
        next();
    }
    catch(err){
        res.status(403).json({
            msg : 'error verifying the header'
        })
    }
}

module.exports ={
    authMiddleware,
}