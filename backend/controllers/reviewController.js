import { error } from "../helpers/error.js";
import productModel from "../models/productModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
export const create=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const {rating,comment}=req.body;
        if(!rating){
            error(400,"Please provide the rating.",false,res);
        }
        if(!comment){
            error(400,"Please provide product review text.",false,res);
        }
        const product=await productModel.findById({_id:product_id});
        if(!product){
            error(400,"Product not found,Invalid product ID.",false,res);
        }
        const user=await userModel.findById({_id:req.user});
        if(!user){
            error(400,"User not found,Ivalid user ID.",false,res);
        }
        const exist=await reviewModel.findOne({product:product_id});
        if(exist){
            exist.reviews.push({
                user:user._id,
                rating,
                comment
            });
            let totalRating=0;
            let totalReviews=0;
            for(let i=0;i<exist.reviews.length;i++){
                totalRating+=exist.reviews[i].rating;
                totalReviews+=1;
            }
            totalRating=Math.round(totalRating/totalReviews);
            exist.rating=totalRating;
            exist.totalReviews=totalReviews;
            await exist.save();
            res.status(201).json({
                success:true,
                message:"Product review send successfully."
            });
        }else{
            const review =await reviewModel({
                product:product_id,
                reviews:[{
                    user:user._id,
                    rating,
                    comment
                }],
                rating,
                totalReviews:1
            }).save();
            res.status(201).json({
                success:true,
                message:"Product review send succssFully."
            });
        }
    }catch(err){
        console.log(err)
        error(400,"Server error.",false,res);
    }
}
export const update=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const product=await productModel.findById({_id:product_id});
        if(!product){
            error(400,"Product not found,Invalid product ID.",false,res);
        }
        const user=await userModel.findById({_id:req.user});
        if(!user){
            error(400,"User not found,Invalid User ID.",false,res);
        }
        const review=await reviewModel.findOne({product:product_id});
        if(!review){
            error(400,"Review not found,Invalid review.",false,res);
        }
        for(let i=0;i<review.reviews.length;i++){
            if(user._id==review.reviews[i].user){
                if(req.body.rating){
                    review.reviews[i].rating=req.body.rating;
                }
                if(req.body.comment){
                    review.reviews[i].comment=req.body.comment;
                }
                break;
            }
        }
        await review.save();
        let totalRating=0;
        for(let i=0;i<review.reviews.length;i++){
            totalRating+=review.reviews[i].rating;
        }
        totalRating=Math.round(totalRating/review.totalReviews);
        review.rating=totalRating;
        await review.save();
        res.status(200).json({
            success:true,
            message:"Review updated successFully."
        });
    }catch(err){
        console.log(err)
        error(400,"Server error.",false,res);
    }
}
export const deleteAll=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const review=await reviewModel.find({product:product_id});
        if(!review){
            error(400,"Review not found.",false,res);
        }
        review.reviews=[];
        review.rating=0;
        review.totalReviews=0;
        await review.save();
        res.status(200).json({
            success:true,
            message:"All reviews deleted successFully."
        });
    }catch(err){
        console.log(err)
        error(400,"Server error.",false,res);
    }
}
export const getAll=async(req,res)=>{
    try{
        const {product_id}=req.params;
        const review=await reviewModel.find({product:product_id});
        res.status(200).json({
            success:true,
            message:"All reviews fetched successFully.",
            reviews:review.reviews,
            rating:review.rating,
            totalReviews:review.totalReviews
        });
    }catch(err){
        console.log(err)
        error(400,"Server error.",false,res);
    }
}