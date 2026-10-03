import mongoose from "mongoose";

export const ImageSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  type: String,
  url: String
}, {
  _id: false
})

export const StatusSchema = {
  type: String,
  enum: ["published", "unpublised"],
  default: "unpublished",
};

export const CatSchema = {
  type: mongoose.Types.ObjectId,
  ref: "Category",
  default: null,
};

export const UserSchema = {
  type: mongoose.Types.ObjectId,
  ref: "User",
  default: null
}