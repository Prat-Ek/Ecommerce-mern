import http from "http"
import app from "./app";

const server = http.createServer(app)
const PORT = 9005


server.listen(PORT, ()=>{
    console.log (`Server is running on PORT: ${PORT}`);
    console.log ("Press CTRL+C to disconnect Server");
})

server.on ("error",(err)=>{
    console.error(err)
    console.error("Server Error:", err.message);
    process.exit(1)

})