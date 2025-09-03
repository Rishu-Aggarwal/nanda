import { error } from "../helpers/error.js";
import getDataUri from "../helpers/getDataUri.js";
import sliderModel from "../models/sliderModel.js";
import cloudinary from "cloudinary";
export const create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      error(400, "Please provide the slider title.", false, res);
    }
    if (!req.file) {
      error(400, "Please provide the slider image.", false, res);
    }
    const file = getDataUri(req.file);
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    const image = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    const slider = await sliderModel({ title, image }).save();
    res.status(201).json({
      success: true,
      message: "Slider created successFully.",
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await sliderModel.findById({ _id: id });
    if (!slider) {
      error(400, "Slider not found,Inavlid slider ID.", false, res);
    }
    if (req.body.title) {
      slider.title = req.body.title;
    }
    if (req.file) {
      await cloudinary.v2.uploader.destroy(slider.image.public_id);
      const file = getDataUri(req.file);
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      slider.image = image;
    }
    await slider.save();
    res.status(200).json({
      success: true,
      message: "Slider updated successFully.",
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
export const deleteSlider = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await sliderModel.findById({ _id: id });
    if (!slider) {
      error(400, "Slider not found,Invalid Slider ID.", false, res);
    }
    await cloudinary.v2.uploader.destroy(slider.image.public_id);
    await sliderModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Slider deleted successFully.",
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
export const get = async (req, res) => {
  try {
    const { id } = req.params;
    const slider = await sliderModel.findById({ _id: id });
    if (!slider) {
      error(400, "Slider not found,Invalid Slider ID.", false, res);
    }
    res.status(200).json({
      success: true,
      message: "Slider found successFully.",
      slider,
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
export const getAll = async (req, res) => {
  try {
    const sliders = await sliderModel.find();
    res.status(200).json({
      success: true,
      message: "All sliders found successFully.",
      total: sliders.length,
      sliders,
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
export const search = async (req, res) => {
  try {
    const { search_str } = req.params;
    const searchRegex = new RegExp(search_str, "i");
    const queryConditions = [
      { title: { $regex: searchRegex } },
    ];

    const sliders = await sliderModel.find({
      $or: queryConditions,
    });
    if (sliders.length == 0) {
      return res.status(200).json({
        success: true,
        message: "slider not found.",
        sliders,
      });
    }
    res.status(200).json({
      success: true,
      message: "slider find successFully",
      sliders,
    });
  } catch (err) {
    console.log(err);
    error(500, "Server Error.", false, res);
  }
};
