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
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
},{ timestamps: true })
export default mongoose.model('Blog', BlogSchema)