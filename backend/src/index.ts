import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User";
import authRouter from "./routes/Auth";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import hotelRouter from "./routes/MyHotels";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log(
        "connected to database: ",
        process.env.MONGODB_CONNECTION_STRING
    );
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
// app.use(cors());
const port = 7000;

// app.get('/api/test', async (req: Request, res:Response) =>{
//     res.json({message:'Hello from backend!'})
// })

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/newhotel", hotelRouter);

app.listen(port, () => {
    console.log(`Server is listening to port ${port}`);
});
