const asyncHandler = require('express-async-handler')
const { create } = require('../models/userModel')
const User = require('../models/userModel')
// @desc Get users
// @routes Get /api/users
// @access private
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
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

        const newUser = new User({... req.body});
        const insertedUser = await newUser.save(); 
    
        res.status(200).json(insertedUser);
    
})

// @desc update users
// @routes put /api/users/:id
// @access private
const updateUser = asyncHandler(async (req,res) => {
    const user  = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('user not found');
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
    const deleteUser = await User.findByIdAndRemove(req.params.id)
    res.status(200).json({message: `id deleted ${req.params.id}`});
})

module.exports = {
    getUsers, createUser, updateUser, deleteUser  
}