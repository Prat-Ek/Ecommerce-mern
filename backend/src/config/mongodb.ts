import mongoose from "mongoose"
import { mongodbConfig } from "./config"

(async()=>{
    try{
        await mongoose.connect(mongodbConfig.url as string,{
            dbName:mongodbConfig.name,
            autoIndex: true,
            autoCreate: true,
        })
           console.log("******** Mongodb server Connected successfully ********");
    }catch(exception){
        console.log (exception)
        console.log ("**** Error connectiog mongodb ****")
        process.exit(1)
    }
})()