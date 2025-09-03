import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    disscount: {
      type: Number,
      required: true,
    },
    cutPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    companyName: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    pakingDetails: {
      productInOnePacket: {
        type: Number,
        default: 1,
      },
      productInOneCartoon: {
        type: Number,
      },
    },
    productWeightInGrams: {
      type: Number,
    }
  },
  { timestamps: true }
);
const productModel=mongoose.model("product",productSchema);
export default productModel;