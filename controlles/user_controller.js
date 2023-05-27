import User from "../modal/User";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId

export const GetAllUsers = async (req, res, next) =>{
    let users 
    try {
        users = await User.find()
    } catch (error) {
        console.log(error);
    }
    if(!users){
        res.status(404).json({message : "no Users Found"})
    }
    return res.status(200).json({users})
}

export const signup =  async (req, res, next)=>{
    const {name, email, password } = req.body
    let existUser
    try {
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({messgae : 'User already Exist'})
        }
    } catch (error) {
        console.log(error);
    }

    const salt = bcrypt.genSaltSync(10)
    console.log(salt);
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = new User({
        name,
        email,
        password : hashedPassword,
        blog : []
    })
    try {
        await user.save()
        return res.status(201).json(user)
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res, next) =>{
    const {email, password} = req.body 
    let existingUser
    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({message : 'User not exist please register now'})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        return res.status(400).json({message : 'incoreect password'})
    }
    if(isPasswordCorrect){
        return res.status(200).json({message : 'you are logedin sucs'})
    }

}

export const DeleteAllUSers = async (req, res, next)=> {
    try {
        await User.deleteMany()
        res.status(200).json({message : 'All Users has been deleted sucs'})
    } catch (error) {
        console.log(error);
    }
}

export const DeleteUser = async (req, res, next)=> {
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        return res.status(500).json({message : 'unvalid User ID'})
    }
    let existUser
    try {
        const user = await User.findById(id)
        if(!user){
            res.status(200).json({message : 'can\'t Find User with this ID'})
        }else{
            await user.deleteOne()
            res.status(200).json({message : 'User Deleted Sucs'})
        }
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsofUser = async (req, res, next) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        return res.status(500).json({message : 'unvalid User ID'})
    }
    let user
    let blogs
    try {
        user = await User.findById(id)
        blogs = user.blogs
        if(!user){
            res.status(200).json({message : 'can\'t Find User with this ID'})
        }
        return res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
    }

}