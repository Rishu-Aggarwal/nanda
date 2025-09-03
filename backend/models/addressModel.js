import mongoose from "mongoose";
const address = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    recieverMobileNumber: {
      type: String,
      required: true,
    },
    placeName: {
      type: String,
      required: true,
    },
    streetNumber: {
      type: Number,
      required: true,
    },
    houseNumber: {
      type: Number,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    villege: {
      type: String,
    },
    postOffice: {
      type: String,
    },
  },
  { timestamps: true }
);
const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    addresses: [address],
  },
  { timestamps: true }
);
const addressModel = mongoose.model("address", addressSchema);
export default addressModel;
