import { Sequelize } from "sequelize";
import { sqlConfig } from "./config";

const sequelize = new Sequelize(sqlConfig.url as string, {
  database: sqlConfig.name as string,

  //dialect: `${sqlConfig.dialect}` as string,
  dialect:sqlConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

(async() => {
  try {
    await sequelize.authenticate()
    console.log("****** Sql server connected successfully *******")
  } catch (exception) {
  if (exception instanceof Error) {
    console.log(exception.message);
  } else {
    console.log(exception);
  }
}

})()


export default sequelize