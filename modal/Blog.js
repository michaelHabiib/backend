import mongoose from "mongoose";
const schema = mongoose.Schema;

const BlogSchema =  new schema({
    title : {
        type : String,
        required : true
    },
    descrption : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    }
})
export default mongoose.model('Blog', BlogSchema)
