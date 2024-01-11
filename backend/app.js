import express from "express";
import cookieParser from "cookie-parser";
import errorhandler from "./middleware/error.js";

const app=express();

app.use(express.json());
app.use(cookieParser());

import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order from "./routes/orderRoute.js";
//route imports

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)

//middleware for error

app.use(errorhandler);

export default app;