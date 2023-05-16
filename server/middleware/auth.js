const jwt = require('jsonwebtoken');
const token_secret = process.env.TOKEN_SECRET;
const db = require('../models');

const checkAuth = async (req, res, next) => {
    
    try {
        const token = req.headers['authorization']; 
        // console.log(token);
        if(token){
            const decode = jwt.verify(token, token_secret);
            const user = await db.User.findOne({email : decode.email});
            if(!user){
                res.status(403).send({
                    data : null,
                    sucess: false,
                    message:"Please login again!"
                });
            }
            next();
        }
        else {
            res.status(401).send({
                data : null,
                sucess: false,
                message:"Token not provided!"
            });
        }

    }
    catch(err){
        // console.log(err);
        if(err.name == "TokenExpiredError"){
            res.status(403).send({
                data : null,
                sucess: false,
                message:"Token is expired!"
            });
        }
        else{
            res.status(500).send({
                data : null,
                error : err,
                sucess: false,
                message:err.message | "Internal Server Error!"
            });
        }
    }
}

module.exports = {checkAuth};
