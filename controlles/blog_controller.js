import Blog from "../modal/Blog";
import mongoose from "mongoose";
import User from "../modal/User";
const ObjectId = mongoose.Types.ObjectId

export const GetAllBllogs = async (req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    let Blogs 
    try {
        Blogs = await Blog.find()
    } catch (error) {
        console.log(error);
    }
    if(!Blogs){
        return res.status(404).json({message : 'no Blogs Found'})
    }
    return res.status(200).json({Blogs})
}

export const addNewBlog = async (req, res, next) =>{
    const {title, descrption, image, user} = req.body
    if(!ObjectId.isValid(user)){
        return res.status(500).json({message : 'unvalid User ID'})
    }
    let existingUser 
    try {
        existingUser = await User.findById(user)
        if(!existingUser){
            return res.status(500).json({message : 'can\'t Find User By This ID'})
        }
    } catch (error) {
        console.log(error);
    }
    const blog =  new Blog({
        title,
        descrption,
        image,
        user
    })
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({session})
        await session.commitTransaction()
        return res.status(201).json({blog})
    } catch (error) {
        console.log(error);
    }
}

export const updateBlog = async (req, res, next) => {
    const id = req.params.id
    
    try {
        await Blog.findByIdAndUpdate(req.params.id,{
            $set : {
                title : req.body.title,
                descrption : req.body.descrption
            }
        })
    } catch (error) {
        console.log(error);
    }
    const blog = await Blog.find({_id : req.params.id})
    return res.status(200).json({blog})
}

export const findBlog = async (req, res, next) =>{
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        return res.status(500).json({message : "unvalid id"})
    }
    const blog = await Blog.findById(req.params.id)
    try {
        if(!blog){
            return res.status(404).json({message : "can't find blog with this id"})
        }else{
            return res.status(404).json({blog})
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id
    if(!ObjectId.isValid(id)){
        return res.status(500).json({message : "unvalid id"})
    }
    let blog
    let bloog
    try {
         bloog = await Blog.findById(id) 
         if(bloog = []){
            return res.status(404).json({message : "can't find blog with this id"})
         }
         blog = await Blog.findByIdAndRemove(id).populate('user')
         await blog.user.blogs.pull(blog)
         await blog.user.save()
         res.status(200).json({message : "blog deleted successfully"})
    } catch (error) {
        console.log(error);
    }
}