import mongoose from "mongoose";
import { ImageSchema } from "../../db/CommonSchema";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 2,
      max: 25,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      max: 25,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      min: 4,
      max: 25,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    address: new mongoose.Schema(
      {
        address: String,
        city: String,
        state: String,
        country: String,
      },
      { _id: false },
    ),
    activationToken: String,
    image:ImageSchema,
    role: {
      type: String,
      enum: ["cusotmer", "seller"],
      default: "customer",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    autoIndex: true,
    autoCreate: true,
  },
);

const UserModel = mongoose.model("User", UserSchema)
export default UserModel;