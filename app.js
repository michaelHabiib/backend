import express from 'express'
import mongoose from 'mongoose'
import  MongoClient  from "mongodb"
import userRouter from './routes/user_route';
import blogRouter from './routes/blog_route';

const passWord = encodeURIComponent("Michael2023#");
const app = express()

app.use(function (req, res, next) {
    //Enabling CORS
    // headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)


mongoose.connect(
    `mongodb+srv://Michael_Ramzy:${passWord}@cluster0.ofxqht3.mongodb.net/Blog?retryWrites=true&w=majority`)
    .then(()=>app.listen(5000)).then(()=>console.log('connected to database on Localhost 5000')).catch((err) =>console.log(err))