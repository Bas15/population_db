const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UserAuth',
    },
    firstname : {
        type : 'string',
        require : [true, 'please fill every field'],
        unique : true
    },
    lastname : {
        type : 'string',
        require : [true, 'please fill every field'],
        unique : true
    },
    email : {
        type : 'string',
        require : [true, 'please fill every field'],
        unique : true
    },
    gender : {
        type : 'string',
        enum : ['male', 'female'],
        require : [true, 'please fill every field']
    },
    home_address : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    department : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    year_of_grad : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    worker : {
        type : 'string',
        enum : ['yes','no'],
        require : [true, 'please fill every field']
    },
    unit_position : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    executive : {
        type : 'string',
        require : [true, 'please fill every field']
    },
}, {
    timestamp : {
        createdAt : 'created_at',
        updatedAt : 'updated_at'
    }
})

module.exports = mongoose.model('User', userSchema)
