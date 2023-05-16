const db = require('../models');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {

        const hasUser = await db.User.findOne({email : req.body.email});
            if(hasUser){
                res.status(401).send({
                    message : 'Email already exist!',
                    data : null,
                    success : false
                });
            }
            else {
                var { password ,  ...newUser} = req.body;
                password = bcrypt.hashSync(password , 8);
                newUser.password = password; 
                
                const data  = await db.User.create(newUser);
                res.status(200).send({
                        message : 'user added successfully.',
                        data : data,
                        success : true
                });
            }

        
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message :err.message | 'Enternal server error',
            error : err,
            success : false
        })
    }        
}

const login = async (req, res) => {
    try{
        const hasUser = await db.User.findOne({email : req.body.email});
            if(!hasUser){
                res.status(401).send({
                    message : 'User not exist.',
                    data : null,
                    success : false
            });
            }
            else {//Email or password is Wrong!
                if(!bcrypt.compareSync(req.body?.password ,hasUser.password)){
                    res.status(401).send({
                        message : 'Email or password is Wrong!',
                        data : null,
                        success : false
                });
                }
                else {
                    res.status(200).send({
                        message : 'Login success!',
                        data : {
                            validUser : true,
                            email : req.body.email
                        },
                        success : true
                     } )
                }
            }
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message :err.message | 'Enternal server error',
            error : err,
            success : false
        })
    }      
}

module.exports  = {signUp , login};