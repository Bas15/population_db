const mongoose = require("mongoose");


const UserAuthSchema = mongoose.Schema({
    firstname : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    email : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
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