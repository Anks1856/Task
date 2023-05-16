const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type : String , unique : true
    },
    password : {
        type : String , minLength : 4
    }
},
{
    timestamps: true
})

const Users = mongoose.model('Users' , usersSchema);

module.exports = Users;