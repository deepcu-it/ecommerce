import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js"
//handling uncaught exception 
process.on("uncaughtException",(err)=> {
    console.log(`Error:${err.massage}`);
    console.log(`shutting down server due to uncaught exception`);

    Server.close(()=>{
        process.exit(1);
    })
})

          
//config
dotenv.config({path:"./config/config.env"});

//connect database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server is live on ${process.env.PORT}`);
})

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.massage}`);
    console.log(`shutting down server due to unhandled promise rejection`);

    Server.close(()=>{
        process.exit(1);
    })
})