import mongoose,{Schema} from "mongoose";

const bookSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,      
        ref:'user'
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    no_of_page:{
        type:Number,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    released_year:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



export const bookModel=mongoose.model('book' , bookSchema)