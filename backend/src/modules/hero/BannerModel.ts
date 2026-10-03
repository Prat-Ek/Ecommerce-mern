import { DataTypes,Model } from "sequelize";
import sequelize from "../../config/sql";

class BannerModel extends Model {}
BannerModel.init({
     _id:{
        type: DataTypes.UUID,
        unique:true,
        primaryKey:true,
        allowNull:false,
        defaultValue: DataTypes.UUIDV4
      },
      title:{
        type:DataTypes.STRING,
        allowNull:false
      },
      subTitle:{
        type:DataTypes.STRING,
        allowNull:true,  //optional
      },
      links:{
        type:DataTypes.JSON,
        allowNull:true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inactive"
      },
      image: {
        type: DataTypes.JSON, 
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      }
},{
    sequelize:sequelize,
    tableName:"banners"
})
// const BannerModel = sequelize.define("Banner",{
//    _id:{
//         type: DataTypes.UUID,
//         unique:true,
//         primaryKey:true,
//         allowNull:false,
//         defaultValue: DataTypes.UUIDV4
//       },
//       title:{
//         type:DataTypes.STRING,
//         allowNull:false
//       },
//       subTitle:{
//         type:DataTypes.STRING,
//         allowNull:true,  //optional
//       },
//       links:{
//         type:DataTypes.JSON,
//         allowNull:true,
//       },
//       status: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: "inactive"
//       },
//       image: {
//         type: DataTypes.JSON, 
//         allowNull: false
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: Date.now()
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: Date.now(),
//       }
// },
// {
//         tableName:"banners",
//       })

export default BannerModel