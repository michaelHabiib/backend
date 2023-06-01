import  express  from "express";
const userRouter = express.Router()
import { GetAllUsers, signup, DeleteUser, DeleteAllUSers, login, getBlogsofUser, DeleteUserBlog } from "../controlles/user_controller";

userRouter.get('/', GetAllUsers)
userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.delete('/', DeleteAllUSers)
userRouter.delete('/:id', DeleteUser)
userRouter.get('/:id', getBlogsofUser)
userRouter.delete('/:BlogID', DeleteUserBlog)
export default userRouter   