const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const UserAuth = require('../models/userAuthModel')

// @desc Get users
// @routes Get /api/users
// @access private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ user: req.UserAuth.id})
    res.status(200).json(users)
})

// @desc create users
// @routes post /api/users
// @access private 
const createUser = asyncHandler(async (req, res) =>{
    
    if(!req.body){
        res.status(400)

        throw new Error('please add txt vlaue');;
    }

      // Set the user field to the authenticated user
        req.body.user = req.UserAuth.id;

        const newUser = new User({... req.body});
        const insertedUser = await newUser.save(); 
    
        res.status(200).json(insertedUser);
    
})

// @desc update users
// @routes put /api/users/:id
// @access private
const updateUser = asyncHandler(async (req,res) => {
    const userSearch  = await User.findById(req.params.id)

    if(!userSearch){
        res.status(400)
        throw new Error('user not found');
    }  

    const user = await UserAuth.findById(req.UserAuth.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(User.user.toString() !== UserAuth.id){
        res.status(401)
        throw new Error('User not authorized')
    }

   const updateUser = await User.findByIdAndUpdate( req.params.id , req.body, {
    new : true
   })
    res.status(200).json(updateUser);
})

// @desc delete users
// @routes delete /api/users/:id
// @access private
const deleteUser = asyncHandler(async (req,res) => {
    const deleteUser = await User.findById(req.params.id)
    if (!User){
        res.status(400)
        throw new Error('Details not found')
    }
    const user = await UserAuth.findById(req.UserAuth.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if(User.user.toString() !== UserAuth.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await User.remove()
    res.status(200).json({message: `id deleted ${req.params.id}`});


})

module.exports = {
    getUsers, createUser, updateUser, deleteUser  
}