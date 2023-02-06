const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    lastname : {
        type : 'string',
        require : [true, 'please fill every field']
    },
    email : {
        type : 'string',
        require : [true, 'please fill every field']
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
    timestamp : true
})

module.exports = mongoose.model('User', userSchema)
