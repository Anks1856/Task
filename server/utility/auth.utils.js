const jwt = require('jsonwebtoken');

const token_secret = process.env.TOKEN_SECRET;
const token_exprireation = process.env.TOKEN_EXP;


const createToken = (payload) => {
    console.log(token_exprireation);
    const token = jwt.sign(payload , token_secret ,{expiresIn: token_exprireation} ,);
    return token;
}

module.exports = createToken;