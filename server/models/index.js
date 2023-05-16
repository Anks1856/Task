const mongoose = require('mongoose');
const UserModel = require('./user.model');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;



mongoose.connect(`mongodb://${host}:${port}/${name}`).then(() =>{
    console.log("successfully connected to mongoDB.");
}).catch((err) => {
    console.log('error while connecting to mongoDB' , err);
})


const db = {};
db.User = UserModel;

module.exports = db;