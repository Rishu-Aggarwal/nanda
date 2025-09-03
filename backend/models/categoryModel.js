import mongoose from "mongoose";
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    total_product:{
        type:Number,
        default:0
    }
},{timestamps:true});
const categoryModel=mongoose.model("category",categorySchema);
export default categoryModel;