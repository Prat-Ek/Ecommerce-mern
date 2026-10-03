import { Dialect } from "sequelize";
import { config } from "dotenv"
config();

export const mongodbConfig ={
    url:process.env.MONGODB_URL,
    name:process.env.MONGODB_NAME
}

export const appConfig = {
  assetsUrl: process.env.ASSETS_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtSecretRefresh: process.env.JWT_REFRESH_SECRET,
};
// export const sqlConfig ={
// url: process.env.SQL_URL,
// name: process.env.DB_NAME,
// dialect: process.env.SQL_TYPE
// }

export const sqlConfig: {
  url: string;
  name: string;
  dialect: Dialect;
} = {
  url: process.env.SQL_URL!,
  name: process.env.DB_NAME!,
  dialect: process.env.SQL_TYPE as Dialect,
};

