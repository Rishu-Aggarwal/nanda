import getDataUri from "../helpers/getDataUri.js";
import categoryModel from "../models/categoryModel.js";
import cloudinary from "cloudinary";
import slugify from "slugify";
import mongoose from "mongoose"
import { error } from "../helpers/error.js";
export const create=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            error(400,"Please Provide The Category Name.",false,res);
        }
        const category=await categoryModel.findOne({name});
        if(category){
            error(400,"This category name is alredy assigned.",false,res);
        }
        const slug=slugify(name.toLowerCase(),'-');
        if(!req.file){
            error(400,"Please Provide Category Image.",false,res);
        }
        const file=getDataUri(req.file);
        const cdb=await cloudinary.v2.uploader.upload(file.content);
        const image={
            public_id:cdb.public_id,
            url:cdb.secure_url
        };
        await categoryModel({name,slug,image}).save();
        res.status(201).json({
            success:true,
            message:"Category created successFully."
        });
    } catch (error) {
        console.log(error);
        error(500,"Server Error.",false,res);
    }
}
export const update=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findById({_id:id});
        if(!category){
            error(404,"Invalid Category Id.",false,res);
        }
        if(req.body.name){
            category.name=req.body.name;
            const slug=slugify(req.body.name,"-");
            category.slug=slug;
            const cat=await categoryModel.findOne({name:req.body.name});
            if(cat){
                error(400,"This category name is alredy assigned.",false,res);
            }
        }
        if(req.file){
            await cloudinary.v2.uploader.destroy(category.image.public_id);
            const file=getDataUri(req.file);
            const cdb=await cloudinary.v2.uploader.upload(file.content);
            const image={
                public_id:cdb.public_id,
                url:cdb.secure_url
            }
            category.image=image;
        }
        await category.save();
        res.status(200).json({
            success:true,
            message:"Category updated successFully."
        });
    } catch (error) {
        console.log(error);
        error(500,"Server Error",false,res);
    }
}
export const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findById({_id:id});
        if(!category){
            error(404,"Invalid Category Id.",false,res);
        }
        await cloudinary.v2.uploader.destroy(category.image.public_id);
        await categoryModel.findByIdAndDelete({_id:id});
        res.status(200).json({
            success:true,
            message:"Category deleted successFully."
        });
    } catch (error) {
        console.log(error);
        error(500,"Server Error",false,res);
    }
}
export const get=async(req,res)=>{
    try {
        const {id}=req.params;
        const category=await categoryModel.findById({_id:id});
        res.status(200).json({
            success:true,
            message:"Category fetched successFully.",
            category
        });
    } catch (error) {
        console.log(error);
        error(500,"Server Error",false,res);
    }
}
export const getAll=async(req,res)=>{
    try {
        const categories=await categoryModel.find();
        res.status(200).json({
            success:true,
            message:"Categories fetched successFully.",
            total:categories.length,
            categories
        });
    } catch (error) {
        console.log(error);
        error(500,"Server Error",false,res);
    }
}
export const search = async (req, res) => {
  try {
    const { search_str } = req.params;
    const searchRegex = new RegExp(search_str, "i");
    const queryConditions = [
      { name: { $regex: searchRegex } },
      { slug: { $regex: searchRegex } },
    ];
    if (mongoose.Types.ObjectId.isValid(search_str)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(search_str) });
    }

    const categories = await categoryModel.find({
      $or: queryConditions,
    });
    if (categories.length == 0) {
      return res.status(200).json({
        success: true,
        message: "Categories not find.",
        categories,
      });
    }
    res.status(200).json({
      success: true,
      message: "Categories find successFully",
      categories,
    });
  } catch (error) {
    console.log(error);
    error(500,"Server Error",false,res);
  }
};