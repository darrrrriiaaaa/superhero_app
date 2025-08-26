// import frameworks
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// import routers
import superheroRouter from "./routes/superhero_routes.js";
import mongoose from "mongoose";

// load .env
dotenv.config();
// create app and make some default settings
const app = express();

app.use(cors());
app.use(express.json());

// use imported routers
app.use("/superheroes", superheroRouter);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// define server port
const PORT = process.env.PORT || 5000;

// start server and listen to the port
mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connected successfully!");
    console.log(`Connected DB name: ${mongoose.connection.name}`);
}).catch(err => console.error(err));