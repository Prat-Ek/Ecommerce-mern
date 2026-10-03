import mongoose from "mongoose";
import { CatSchema, ImageSchema, StatusSchema, UserSchema } from "../../db/CommonSchema";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 32,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent:CatSchema ,
    image: ImageSchema,
    status: StatusSchema,
    createdBy: UserSchema,
    updatedBy: UserSchema,
  },
  {
    autoCreate: true,
    autoIndex: true,
    timestamps: true,
  },
);

const CategoryModel = mongoose.model("Category", CategorySchema);
export default CategoryModel;
