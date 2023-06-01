import User from "../modal/User";
import Blog from "../modal/Blog";
import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const ObjectId = mongoose.Types.ObjectId

export const GetAllUsers = async (req, res, next) =>{
    let users 
    try {
        users = await User.find()
    } catch (error) {
        console.log(error);
    }
    if(!users){
        res.status(404).json({message : "No Users Found"})
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
    let name
    let NewBlog = {}
    let newBlogs
    let blogs
    let id
    let UserId
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
        return res.status(400).json({message : 'incorrect password'})
    }
    if(isPasswordCorrect){
        let jwtSecretKey = 'miko30121997'
        
        name = existingUser.name
        blogs = existingUser.blogs
        newBlogs = await Blog.find({ _id: { $in: blogs } }) 
        UserId = existingUser._id
        const data = {name,newBlogs,UserId}
        const token = jwt.sign(data, jwtSecretKey);
        return res.status(200).json({token})
    }

}

export const DeleteAllUSers = async (req, res, next)=> {
    try {
        await User.deleteMany()
        res.status(200).json({message : 'All Users has been deleted successfully'})
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
            res.status(200).json({message : 'User Deleted successfully'})
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
    let newBlogs
    try {
        user = await User.findById(id)
        blogs = user.blogs
        if(!user){
            return res.status(200).json({message : 'can\'t Find User with this ID'})
        }else if(user) {
            newBlogs = await Blog.find({ _id: { $in: blogs } }) 
            return res.status(200).json(newBlogs)
        }
    } catch (error) {
        console.log(error);
    }
}
// export const DeleteUserBlogs = async (req,res,next) =>{
//     const UserID = req.params.Userid
//     const BlogID = req.parama.BlogID
//     if(!ObjectId.isValid(UserID)){
//         return res.status(500).json({message : 'unvalid User ID'})
//     }else if(!ObjectId.isValid(BlogID)){
//         return res.status(500).json({message : 'unvalid User ID'})
//     }
//     let user
//     try {
//         user =  await User.findById(UserID)
//         user.blogs
//         return res.status(200).json(user)
//     } catch (error) {
//         console.log(error);
//     }
// }
export const DeleteUserBlog = async (req,res,next) =>{
    const BlogID = req.parama.BlogID
    if(!ObjectId.isValid(BlogID)){
        return res.status(500).json({message : 'unvalid User ID'})
    }
    let blog
    try {
        blog =  await Blog.findByIdAndDelete(BlogID)
        return res.status(200).json({message : 'Blog Deleted Successfully'})
    } catch (error) {
        console.log(error);
    }
}