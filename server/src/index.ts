/* IMPORTS */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import adminRoutes from "./routes/admin.js";
import userRoutes from "./routes/user.js";


/* CONFIGURATIONS */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json());

/* ROUTES */

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);


/* MONGOOSE CONNECTION */
const PORT = process.env.PORT || 6000;
const MONGODB_URL: string = process.env.MONGODB_URL!

mongoose
    .connect(MONGODB_URL, {
        dbName: "coursesDB"
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    })
    .catch((err) => console.log(`${err}, couldn't connect`))