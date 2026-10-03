import { Request, Response, NextFunction } from "express";
import { IAuthRequest } from "../../types/IAuthtype";
import slugify from "slugify";
import { mapImageForDb } from "../../utilities/helper";
import CategoryModel from "./CategoryModel";

class CategoryController {
  async store(req: IAuthRequest, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      data.createdBy = req.loggedInUser?._id;

      data.slug = slugify(data.name, { lower: true });

      if (!data.parent || data.parent === "null") {
        data.parent = null;
      }

      if (req.file) {
        data.image = mapImageForDb(req.file, "categories/");
      }
      const catObj = new CategoryModel(data);
      await catObj.save();
      res.json({
        data: catObj,
        message: "Category Created Successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      let filter = {};
      //search
      if (req.query.q){
        filter={
          $or:[
            {name:new RegExp(req.query.q as string, 'i')},
            {slug:new RegExp( req.query.q as string ,'i')}
          ]
        }
      }

      if (req.query.status){
        filter={
          ...filter,
          status: req.query.status,
        }
      }

      // pagination

      const page = (req.query.page || 1) as number;
      const limit = (req.query.limit || 30) as number;
      const skip = (page-1)*limit
     

      const data = await  CategoryModel.find(filter)
      .populate("parent",["_id","name","slug","image.url","status"])
      .populate("createdBy", ["_id","name", "email","phone"])
      .populate("updatedBy", ["_id","name", "email","phone"])
      .sort ({createdAt:"ascending"})
      .skip(skip)
      .limit(limit)

       const totalCount = await CategoryModel.countDocuments(filter);

      
      res.json({
        data:data.map((catData)=>{
          return{
            _id:catData._id,
            name:catData.name,
            slug:catData.slug,
            parent:catData.parent,
            image:catData.image?.url,
            status:catData.status,
            createdBy:catData.createdBy,
            updatedBy:catData.updatedBy
          }
        }),
        message:"Category List",
        meta:{
          pagination:{
            page:+page,
            limit:+limit,
            total:+totalCount,
            totalPage: Math.ceil (totalCount/limit),
          }
        }
      })
    } catch (exception) {
      
    }
  }
  async FElistAll(req: Request, res: Response, next: NextFunction) {
    try {
      let filter={
        status:"published"
      } as Record <string,any>
        //search
      if (req.query.q){
        filter={
          $or:[
            {name:new RegExp(req.query.q as string, 'i')},
            {slug:new RegExp( req.query.q as string ,'i')}
          ]
        }
      }

      if (req.query.status){
        filter={
          ...filter,
          status: req.query.status,
        }
      }

      // pagination

      const page = (req.query.page || 1) as number;
      const limit = (req.query.limit || 30) as number;
      const skip = (page-1)*limit
     

      const data = await  CategoryModel.find(filter)
      .populate("parent",["_id","name","slug","image.url","status"])
      .populate("createdBy", ["_id","name", "email","phone"])
      .populate("updatedBy", ["_id","name", "email","phone"])
      .sort ({createdAt:"ascending"})
      .skip(skip)
      .limit(limit)

       const totalCount = await CategoryModel.countDocuments(filter);

      
      res.json({
        data:data.map((catData)=>{
          return{
            _id:catData._id,
            name:catData.name,
            slug:catData.slug,
            parent:catData.parent,
            image:catData.image?.url,
            status:catData.status,
            createdBy:catData.createdBy,
            updatedBy:catData.updatedBy
          }
        }),
        message:"Category List",
        meta:{
          pagination:{
            page:+page,
            limit:+limit,
            total:+totalCount,
            totalPage: Math.ceil (totalCount/limit),
          }
        }
      })

      
    } catch (exception) {
      
    }

  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const catDetail = await CategoryModel.findById(req.params.id)
        if(!catDetail) {
        throw {code: 422, message: "Category id is invalid"}
      }
      res.json({
         data: catDetail,
        message: "Category Detail",
        meta: null
      })

      
    } catch (exception) {
      next(exception)
    } 
  }

  async getDetailBySlug(req: Request, res: Response, next: NextFunction){
    try {
       const catDetail = await CategoryModel.findOne({
        slug:req.params.slug
       })

        if(!catDetail) {
        throw {code: 422, message: "Category id is invalid"}
      }

      res.json({
         data: {
            cat: catDetail, content: null
          },
        message: "Category Detail",
        meta: null
      })
      
    } catch (exception) {
      next(exception)
    }
  }

 async update(req: IAuthRequest, res: Response, next: NextFunction) {
  try {
    const catDetail = await CategoryModel.findById(req.params.catId)
        if(!catDetail) {
        throw {code: 422, message: "Category doesnot exist"}
      }
        const data = req.body;
      data.updatedBy = req.loggedInUser?._id;


      if (!data.parent || data.parent === "null") {
        data.parent = null;
      }

      if (req.file) {
        data.image = mapImageForDb(req.file, "categories/");
      }else {
         data.image = catDetail.image
      }
      const updated = await CategoryModel.findOneAndUpdate({
        _id:catDetail._id
      },data,{new:true})
    res.json({
        data:updated,
        message: "Category Updated Successfully",
        meta: null
      })
  } catch (exception) {
    next(exception)
  }
 }

 async  delete(req: Request, res: Response, next: NextFunction) {
  try {
      const catDetail = await CategoryModel.findById(req.params.catId)
        if(!catDetail) {
        throw {code: 422, message: "Category id is invalid"}
      }
      const del = await CategoryModel.findOneAndDelete ({
        _id: req.params.catId
      })
      res.json({
         data: del,
        message: "Category Deleted Successfully",
        meta: null
      })

    } catch (exception) {
      next(exception)
    } 
 }
}

export default CategoryController;
