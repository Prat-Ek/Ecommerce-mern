require("dotenv").config()

module.exports={
    development:{
        url:process.env.SQL_URL,
        // dialect:`${process.env.SQL_TYPE}`
         dialect: "postgres",
        dbName:process.env.DB_NAME,
        dialectOptions:{
            ssl:{
                require:true
            }

        }
    },
    test:{
        url:process.env.SQL_URL,
        // dialect:`${process.env.SQL_TYPE}`
         dialect: "postgres",
        dbName:process.env.DB_NAME,
        dialectOptions:{
            ssl:{
                require:true
            }

        }
    },
    production:{
        url:process.env.SQL_URL,
        // dialect:`${process.env.SQL_TYPE}`
         dialect: "postgres",
        dbName:process.env.DB_NAME,
        dialectOptions:{
            ssl:{
                require:true
            }

        }
    }
}