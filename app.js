import express from 'express'
import mongoose from 'mongoose'
import  MongoClient  from "mongodb"
import userRouter from './routes/user_route';
import blogRouter from './routes/blog_route';

const passWord = encodeURIComponent("Michael2023#");
const app = express()
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)


mongoose.connect(
    `mongodb+srv://Michael_Ramzy:${passWord}@cluster0.ofxqht3.mongodb.net/Blog?retryWrites=true&w=majority`)
    .then(()=>app.listen(5000)).then(()=>console.log('connected to database on Localhost 5000')).catch((err) =>console.log(err))