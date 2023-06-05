const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require('express-async-handler')
const UserAuth = require('../models/userAuthModel')


// @desc register user
// @routes post /api/UserAuth
// @access private
const registerUser = asyncHandler( async(req,res) => {

    const {firstname , email, password } = req.body

    if(!firstname || !email || !password){
        res.status(400) 

        throw new Error ("please include all field");
    }

    const userExists = await UserAuth.findOne({email}) 

    if (userExists){
        res.status(400)

        throw new Error ("User already exist")
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user

    const user = await UserAuth.create({
        firstname,
        email,
        password : hashedPassword,
        
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            email: user.email,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(400)
        throw new Error("Invalid user data") 
    }

    // res.json('User registered')
})

// @desc Authenticate User
// @routes post /api/UserAuth/login
// @access private
const loginUser = asyncHandler( async(req, res) => {
    const {email, password} = req.body

    const user = await UserAuth.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id,
            firstname: user.firstname,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Wrong credentials")
    }

})

// @desc get user data
// @routes get /api/UserAuth/me
// @access private
const getme = asyncHandler( async(req, res) => {
    const {_id, firstname, email } = await UserAuth.findById(req.user.id)

    res.status(200).json({
        id: _id,
        firstname,
        email,
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports= {
    registerUser,
    loginUser,
    getme 
}