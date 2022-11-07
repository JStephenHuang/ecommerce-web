import mongoose, { Schema } from "mongoose";
import { schoolSchema } from "./school";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  clothingType: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  school: {
    type: schoolSchema,
    required: true,
  },
  images: {
    type: [],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

type listingType = typeof listingSchema;

const Listing = mongoose.model("Listing", listingSchema);

export { Listing, listingType, listingSchema };
