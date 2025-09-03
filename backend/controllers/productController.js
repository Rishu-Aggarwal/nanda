import productModel from "../models/productModel.js";
import { error } from "../helpers/error.js";
import slugify from "slugify";
import getDataUri from "../helpers/getDataUri.js";
import cloudinary from "cloudinary";
import categoryModel from "../models/categoryModel.js";
import mongoose from "mongoose";
export const create = async (req, res) => {
  try {
    const { name, mrp, disscount, description, category } = req.body;
    if (!name) {
      error(400, "Please provide product name.", false, res);
    }
    if (!mrp) {
      error(400, "Please provide the product maxmium rate price.", false, res);
    }
    if (!disscount) {
      error(400, "Please provide the disscount of the product.", false, res);
    }
    if (!description) {
      error(400, "Please provide the product description.", false, res);
    }
    if (!category) {
      error(400, "Please provide the product category", false, res);
    }
    const exist = await productModel.findOne({ name });
    if (exist) {
      error(400, "This product already present.", false, res);
    }
    const cat = await categoryModel.findById({ _id: category });
    if (!cat) {
      error(400, "Category not found,Invalid category ID.", false, res);
    }
    cat.total_product += 1;
    const slug = slugify(name.toLowerCase(), "-");
    const cutPrice = Math.round(mrp - mrp / disscount);
    if (!req.files) {
      error(400, "Please provide the product images.", false, res);
    }
    let arr = [];
    for (let i = 0; i < req.files.length; i++) {
      let file = getDataUri(req.files[i]);
      let cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      arr.push(image);
    }
    let companyName = "";
    if (req.body?.companyName) {
      companyName = req.body.companyName;
    }
    let stock = 0;
    if (req.body?.stock) {
      stock = req.body.stock;
    }
    let packingDetails = {
      productInOnePacket: 1,
      productInOneCartoon: 1,
    };
    if (req.body?.productInOnePacket) {
      packingDetails.productInOnePacket = req.body.productInOnePacket;
    }
    if (req.body?.productInOneCartoon) {
      packingDetails.productInOneCartoon = req.body.productInOneCartoon;
    }
    let productWeightInGrams = 0;
    if (req.body?.productWeightInGrams) {
      productWeightInGrams = req.body.productWeightInGrams;
    }
    const product = await productModel({
      name,
      slug,
      mrp,
      disscount,
      cutPrice,
      description,
      category,
      images: arr,
      companyName,
      stock,
      packingDetails,
      productWeightInGrams,
    }).save();
    await cat.save();
    res.status(201).json({
      success: true,
      message: "Product created successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const update = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productModel.findById({ _id: product_id });
    if (!product) {
      error(400, "Product not found,Invalid product ID.", false, res);
    }
    if (req.body.name) {
      product.name = req.body.name;
      product.slug = slugify(req.body.name.toLowerCase(), "-");
    }
    if (req.body.mrp) {
      const mrp = req.body.mrp;
      product.mrp = mrp;
      product.cutPrice = Math.round(mrp - mrp / product.disscount);
    }
    if (req.body.disscount) {
      const disscount = req.body.disscount;
      product.disscount = disscount;
      product.cutPrice = Math.round(product.mrp - product.mrp / disscount);
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.category) {
      const cat = req.body.category;
      const category = await categoryModel.findById({ _id: product.category });
      if (!category) {
        error(400, "Category not found,Invalid ID.", false, res);
      }
      category.total_product -= 1;
      await category.save();
      const newCategory = await categoryModel.findById({ _id: cat });
      if (!newCategory) {
        error(400, "This Category not found,Invalid new ID.", false, res);
      }
      newCategory += 1;
      await newCategory.save();
    }
    if (req.body.companyName) {
      product.companyName = req.body.companyName;
    }
    if (req.body.stock) {
      product.stock = req.body.stock;
    }
    if (req.body.productInOnePacket) {
      product.productInOnePacket = req.body.productInOnePacket;
    }
    if (req.body.productInOneCartoon) {
      product.productInOneCartoon = req.body.productInOneCartoon;
    }
    if (req.body.productWeightInGrams) {
      product.productWeightInGrams = req.body.productWeightInGrams;
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productModel.findById({ _id: product_id });
    if (!product) {
      error(400, "Product not found,Invalid product ID.", false, res);
    }
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const category = await categoryModel.findById({ _id: prodyct.category });
    if (!category) {
      error(400, "Product category not found,Invalid category ID.", false, res);
    }
    category.total_product -= 1;
    await productModel.findByIdAndDelete({ _id: product_id });
    category;
    await category.save();
    res.status(200).json({
      success: true,
      message: "Product deleted successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const updateSingleImage = async (req, res) => {
  try {
    const { product_id, image_id } = req.params;
    const product = await productModel.findById({ _id: product_id });
    if (!product) {
      error(400, "Productno found,Invalid product ID.", false, res);
    }
    if (!req.file) {
      error(400, "Please provide the image.", false, res);
    }
    for (let i = 0; i < product.images.length; i++) {
      if (image_id === product.images[i]._id) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        const file = getDataUri(req.file);
        const cdb = await cloudinary.v2.uploader.upload(file.content);
        product.images[i].public_id = cdb.public_id;
        product.images[i].url = cdb.secure_url;
      }
    }
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product image updated successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const deleteSigleImage = async (req, res) => {
  try {
    const { product_id, image_id } = req.params;
    const product = await productModel.findById({ _id: product_id });
    if (!product) {
      error(400, "Productno found,Invalid product ID.", false, res);
    }
    let arr = [];
    for (let i = 0; i < product.images.length; i++) {
      if (image_id === product.images[i]._id) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      } else {
        arr.push(product.images[i]);
      }
    }
    product.images = arr;
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product image deleted successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const get = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productModel
      .findById({ _id: product_id })
      .populate("category");
    if (!product) {
      error(400, "Product not found,Invalid product ID.", false, res);
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successFully.",
      product,
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const getAll = async (req, res) => {
  try {
    const products = await productModel.find().populate("category");
    res.status(200).json({
      success: true,
      message: "Products fetched successFully.",
      total: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const deleteAllProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < products[i].images.length; j++) {
        await cloudinary.v2.uploader.destroy(products[i].images[j].public_id);
      }
      await productModel.findByIdAndDelete({ _id: products[i]._id });
    }
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const searchProduct = async (req, res) => {
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

    const products = await productModel.find({
      $or: queryConditions,
    });
    if (products.length == 0) {
      return res.status(200).json({
        success: true,
        message: "products not find.",
        products,
      });
    }
    res.status(200).json({
      success: true,
      message: "products find successFully",
      products,
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const uploadSingleImage = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await productModel.findById({ _id: product_id });
    if (!product) {
      error(400, "Product not found,Invalid product ID.", false, res);
    }
    if (!req.file) {
      error(400, "Please provide the product image.", false, res);
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const images = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    product.images.push(images);
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product images added successFully.",
    });
  } catch (error) {
    console.log(error);
    error(500, "Server Error", false, res);
  }
};
export const searchProductsByCategory = async (req, res) => {
  const { search_str } = req.params;
  try {
    const isObjectId = mongoose.Types.ObjectId.isValid(search_str);

    const category = await categoryModel.findOne({
      $or: [
        { name: { $regex: search_str, $options: "i" } }, // case-insensitive name match
        { slug: { $regex: search_str, $options: "i" } }, // case-insensitive slug match
        ...(isObjectId ? [{ _id: search_str }] : []), // include ID match only if valid
      ],
    });
    if (!category) {
      error(400, "Category not found.", false, res);
    }
    const products = await productModel.find({ category: category._id });
    res.status(200).json({
      success: true,
      message: "Product found successFully.",
      total_product: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error", false, res);
  }
};
export const searchProductByCategoryAndProductName=async(req,res)=>{
  try {
    const {search_str}=req.params;
    const products=await productModel.find({
      "$or":[
        {"name":{$regex:search_str,$options:'i'}}
      ]
    });
    const byCategory=await categoryModel.find({
      "$or":[
        {"name":{$regex:search_str,$options:'i'}},
        {"slug":{$regex:search_str,$options:'i'}}
      ]
    });
    const categories=[];
    const quantity=[];
    if(byCategory.length>0){
      for(let i=0;i<byCategory.length;i++){
        if(byCategory[i].total_product>0){
          categories.push(byCategory[i]);
          quantity.push(byCategory[i].total_product);
          const productByCategory=await productModel.find({category:byCategory[i]._id});
          if(productByCategory.length>0){
            for(let j=0;j<productByCategory.length;j++){
              products.push(productByCategory[j]);
            }
          }
        }
      }
    }
    res.status(200).json({
      success:true,
      message:"Product search successFully.",
      total:products.length,
      products,
      categories,
      quantity
    });
  } catch (error) {
    console.log(err);
    error(500, "Server Error", false, res);
  }
}