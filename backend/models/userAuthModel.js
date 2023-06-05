const mongoose = require("mongoose");


const UserAuthSchema = mongoose.Schema({
    firstname : {
        type : 'String',
        require: [true, 'please add name'],
    },
    email : {
        type : 'String',
        require: [true, 'please add email'],
        unique: true
    },
    password : {
        type : 'String',
        required : [true,'please add a value']
    }
},
{
    timestamps: true
})




module.exports = mongoose.model('UserAuth', UserAuthSchema);