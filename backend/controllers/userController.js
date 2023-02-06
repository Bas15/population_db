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
    
    if(!req.body.text){
        res.status(400)

        throw new Error('please add txt vlaue');;
    }
    const users = await create({
        firstname : req.body.text,
        lastname : req.body.text,
        email : req.body.text,
        gender : req.body.text,
        home_address : req.body.text,
        department : req.body.text,
        year_of_grad : req.body.text,
        worker : req.body.text,
        unit_position : req.body.text,
        executive : req.body.text,
    })
    
        res.status(200).json(users)
    
})

// @desc update users
// @routes put /api/users/:id
// @access private
const updateUser = asyncHandler(async (req,res) => {
    res.json({message:`updated victory number ${req.params.id}`});
})

// @desc delete users
// @routes delete /api/users/:id
// @access private
const deleteUser = asyncHandler(async (req,res) => {
    res.json({message: `victory number deleted ${req.params.id}`});
})

module.exports = {
    getUsers, createUser, updateUser, deleteUser  
}