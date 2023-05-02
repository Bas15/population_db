const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const userAuth = require('../models/userAuthModel')


// @desc register user
// @routes post /api/userAuth
// @access private
const registerUser = asyncHandler( async(req,res) => {

    const {firstname , email, password } = req.body

    if(!firstname || !email || !password){
        res.status(400) 

        throw new error ("please include all field");
    }

    const userExists = await userAuth.findOne({email}) 

    if (userExists){
        res.status(400)

        throw new error ("User already exist")
    }

    //hash password
    const salt = bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user

    const user = await User.create({
        firstname,
        email,
        password : hashedPassword
        
    })

    if(user){
        res.status(201).json({
            _id : User.id,
            firstname: User.firstname,
            email: User.email
        })
    } else {
        res.status(400)
        throw new error("Invalid user data")
    }
})

// @desc Authenticate User
// @routes post /api/userAuth/login
// @access private
const loginUser = asyncHandler( async(req, res) => {
    res.json({message : "user logged in"})
})

// @desc get user data
// @routes get /api/userAuth/me
// @access private
const getme = asyncHandler( async(req, res) => {
    res.json({message : "get data"})
})

module.exports= {
    registerUser,
    loginUser,
    getme 
}