import { Request, Response, NextFunction } from "express";
import { mapBannerData, mapImageForDb, normalizeJsonField } from "../../utilities/helper";
import BannerModel from "./BannerModel";
import { Op } from "sequelize";

class BannerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      if (!req.file) {
        throw {
          code: 400,
          details: {
            image: "Image is required",
          },
        };
      }
      data.image = mapImageForDb(req.file, "banners/");
      data.links = normalizeJsonField(data.links);

      const banner = await BannerModel.create(data);

      res.json({
        data: mapBannerData(banner),
        message: "banner Created Successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      let filter = {};

      if (req.query.search) {
        filter = {
          [Op.or]: [
            { title: { [Op.iLike]: `%${req.query.search}%` } },
            { subTitle: { [Op.iLike]: `%${req.query.search}%` } },
          ],
        };
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;

      const skip = (page - 1) * limit;

      const { rows, count } = await BannerModel.findAndCountAll({
        where: filter,
        order: [["createdAt", "desc"]],
        offset: skip,
        limit: limit,
      });
      res.json({
        data: rows.map(mapBannerData),
        message: "Banner List",
        meta: {
          pagination: {
            page: +page,
            limit: +limit,
            total: count,
            totalPages: Math.ceil(count / limit),
          },
        },
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  }

  async listAllForHome(req: Request, res: Response, next: NextFunction) {
    try {
      let filter = {
        status: "active",
      };

      const rows = await BannerModel.findAll({
        where: filter,
        order: [["createdAt", "desc"]],
        limit: 5,
      });

      res.json({
        data: rows.map(mapBannerData),
        message: "Banner List",
        meta: null,
      });
    } catch (exception) {
      console.log(exception);
      next(exception);
    }
  }

  async deleteBannerById(req: Request, res: Response, next: NextFunction) {
    try {
      const bannerId = req.params.bannerId;

      const bannerDetail = await BannerModel.findByPk(bannerId as string);

      if (!bannerDetail) {
        throw {
          code: 404,
          message: "Banner Not found",
        };
      }

      await BannerModel.destroy({
        where: {
          _id: bannerId,
        },
      });

      res.json({
        data: mapBannerData(bannerDetail),
        message: "Banner Deleted successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getBannerById(req: Request, res: Response, next: NextFunction) {
    try {
        const bannerId = await req.params.bannerId as string;
        const bannerDetail = await BannerModel.findOne({
            where:{
                _id:bannerId
            }
        })
        if (!bannerDetail) {
        throw { code: 404, message: "Banner Not found" };
      }
      res.json({
        data: mapBannerData(bannerDetail),
        message: "Banner details",
        meta: null,
      })
        
    } catch (exception) {
        console.log(exception)
        next(exception)
    }
  }
  async update (req: Request, res: Response, next: NextFunction){
    try {
        const bannerId = req.params.bannerId as string
          const bannerDetail = await BannerModel.findOne({
        where: {
          _id: bannerId
        }
      });
      if (!bannerDetail) {
        throw { code: 404, message: "Banner Not found" };
      }
      const data = req.body;
      if (req.file) {
        data.image = mapImageForDb(req.file, "banners/");
      } else {
        data.image = normalizeJsonField(bannerDetail.image);
      }
      data.links = normalizeJsonField(data.links);
         const banner = await BannerModel.update(data, {
        where: {
          _id: bannerId
        }
      })
      res.json({
        data:mapBannerData(banner),
        message:"Banner updated Successfully",
        meta:null
      })
    } catch (exception) {
        next(exception)
    }

  }
}

export default BannerController;
