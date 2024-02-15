import { body } from "express-validator";
import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

router.post(
    "/",
    verifyToken,
    [
        body("name").notEmpty().withMessage("Name is requeired"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Type is required"),
        body("adultCount")
            .notEmpty()
            .isNumeric()
            .withMessage("Adult count is number and is required"),
        body("childCount")
            .notEmpty()
            .isNumeric()
            .withMessage("Child count is number and is required"),
        body("pricePerNight")
            .notEmpty()
            .isNumeric()
            .withMessage("price per night is number and is required"),
        body("starRating")
            .notEmpty()
            .isNumeric()
            .withMessage("Star rating is number and is required"),
        body("facilities")
            .notEmpty()
            .isArray()
            .withMessage(
                "Facilities is an array of strings and this field is required"
            ),
        body(),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
        try {
            const newHotel = req.body;
            const imageFiles = req.files as Express.Multer.File[];
            const uploadPromises = imageFiles.map(async (image) => {
                const imageBuffer = Buffer.from(image.buffer);
                const b64 = imageBuffer.toString("base64");
                const imageURI = "data:" + image.mimetype + ";base64," + b64;
                const uploadResponse =
                    await cloudinary.v2.uploader.upload(imageURI);
                return uploadResponse.url;
            });

            const imageURLs = await Promise.all(uploadPromises);
            newHotel.imageURLs = imageURLs;
            const hotel = new Hotel(newHotel);
            await hotel.save();
            return res
                .status(200)
                .json({ message: "Hotel created successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
);

export default router;
