import  express  from "express";
import { GetAllBllogs, addNewBlog, deleteBlog, findBlog, updateBlog } from "../controlles/blog_controller";
const blogRouter = express.Router()

blogRouter.get('/', GetAllBllogs)
blogRouter.get('/:id', findBlog)
blogRouter.delete('/:id', deleteBlog)
blogRouter.post('/add', addNewBlog)
blogRouter.put('/update/:id', updateBlog)

export default blogRouter